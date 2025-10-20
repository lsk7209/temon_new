-- 테몬 MBTI 플랫폼 데이터베이스 스키마
-- Supabase PostgreSQL 데이터베이스용

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator');
CREATE TYPE test_status AS ENUM ('draft', 'active', 'inactive', 'archived');
CREATE TYPE upload_type AS ENUM ('test_image', 'result_image', 'avatar', 'banner');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests table
CREATE TABLE tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  icon VARCHAR(50),
  color_gradient VARCHAR(100),
  status test_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test questions table
CREATE TABLE test_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_a_tags JSONB DEFAULT '[]',
  choice_b_tags JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_id, question_number)
);

-- Test results table
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
  result_type VARCHAR(10) NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test result characters table
CREATE TABLE test_result_characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
  result_type VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10),
  summary TEXT,
  description JSONB DEFAULT '[]',
  recommended_items JSONB DEFAULT '[]',
  compatible_types JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_id, result_type)
);

-- File uploads table
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  upload_type upload_type NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions table
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_name VARCHAR(100) NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_path VARCHAR(255),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test statistics table
CREATE TABLE test_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  starts INTEGER DEFAULT 0,
  completions INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(test_id, date)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_tests_slug ON tests(slug);
CREATE INDEX idx_tests_status ON tests(status);
CREATE INDEX idx_tests_category ON tests(category);
CREATE INDEX idx_test_questions_test_id ON test_questions(test_id);
CREATE INDEX idx_test_results_user_id ON test_results(user_id);
CREATE INDEX idx_test_results_test_id ON test_results(test_id);
CREATE INDEX idx_test_results_completed_at ON test_results(completed_at);
CREATE INDEX idx_uploads_user_id ON uploads(user_id);
CREATE INDEX idx_uploads_upload_type ON uploads(upload_type);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_test_statistics_test_id ON test_statistics(test_id);
CREATE INDEX idx_test_statistics_date ON test_statistics(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_questions_updated_at BEFORE UPDATE ON test_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_result_characters_updated_at BEFORE UPDATE ON test_result_characters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_statistics_updated_at BEFORE UPDATE ON test_statistics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_result_characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_statistics ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Tests policies
CREATE POLICY "Anyone can view active tests" ON tests
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage all tests" ON tests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Test questions policies
CREATE POLICY "Anyone can view questions for active tests" ON test_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tests 
      WHERE id = test_id AND status = 'active'
    )
  );

CREATE POLICY "Admins can manage all test questions" ON test_questions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Test results policies
CREATE POLICY "Users can view their own results" ON test_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own results" ON test_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all results" ON test_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Test result characters policies
CREATE POLICY "Anyone can view result characters for active tests" ON test_result_characters
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tests 
      WHERE id = test_id AND status = 'active'
    )
  );

CREATE POLICY "Admins can manage all result characters" ON test_result_characters
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Uploads policies
CREATE POLICY "Users can view their own uploads" ON uploads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own uploads" ON uploads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own uploads" ON uploads
  FOR DELETE USING (auth.uid() = user_id);

-- User sessions policies
CREATE POLICY "Users can manage their own sessions" ON user_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Analytics events policies
CREATE POLICY "Users can create analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all analytics events" ON analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Test statistics policies
CREATE POLICY "Anyone can view test statistics" ON test_statistics
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage test statistics" ON test_statistics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert initial admin user (password should be changed)
INSERT INTO users (email, name, role) VALUES 
('admin@temon.kr', 'Admin User', 'admin');

-- Insert sample test data
INSERT INTO tests (slug, title, description, category, icon, color_gradient, status) VALUES 
('coffee-mbti', '☕ 커피 MBTI', '당신의 커피 취향으로 알아보는 성격 유형', '음식', 'Coffee', 'from-amber-500 to-orange-600', 'active'),
('ramen-mbti', '🍜 라면 MBTI', '라면 취향으로 알아보는 나의 성격', '음식', 'Soup', 'from-red-500 to-pink-600', 'active'),
('pet-mbti', '🐾 반려동물 MBTI', '반려동물 성향으로 알아보는 성격 테스트', '관계', 'Heart', 'from-pink-500 to-rose-600', 'active');

-- Create functions for common operations
CREATE OR REPLACE FUNCTION get_user_test_results(user_uuid UUID)
RETURNS TABLE (
  test_id UUID,
  test_title VARCHAR(200),
  result_type VARCHAR(10),
  completed_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.title,
    tr.result_type,
    tr.completed_at
  FROM test_results tr
  JOIN tests t ON tr.test_id = t.id
  WHERE tr.user_id = user_uuid
  ORDER BY tr.completed_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_test_statistics(test_uuid UUID, days INTEGER DEFAULT 30)
RETURNS TABLE (
  date DATE,
  views INTEGER,
  starts INTEGER,
  completions INTEGER,
  shares INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ts.date,
    ts.views,
    ts.starts,
    ts.completions,
    ts.shares
  FROM test_statistics ts
  WHERE ts.test_id = test_uuid
    AND ts.date >= CURRENT_DATE - INTERVAL '1 day' * days
  ORDER BY ts.date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create views for easier querying
CREATE VIEW active_tests AS
SELECT 
  t.*,
  COUNT(tq.id) as question_count
FROM tests t
LEFT JOIN test_questions tq ON t.id = tq.test_id
WHERE t.status = 'active'
GROUP BY t.id;

CREATE VIEW test_popularity AS
SELECT 
  t.id,
  t.title,
  t.slug,
  COUNT(tr.id) as total_completions,
  COUNT(DISTINCT tr.user_id) as unique_users,
  AVG(CASE WHEN tr.completed_at >= NOW() - INTERVAL '7 days' THEN 1 ELSE 0 END) as recent_completion_rate
FROM tests t
LEFT JOIN test_results tr ON t.id = tr.test_id
WHERE t.status = 'active'
GROUP BY t.id, t.title, t.slug
ORDER BY total_completions DESC;
