import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'moderator'
          is_active: boolean
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'moderator'
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tests: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          category: string | null
          icon: string | null
          color_gradient: string | null
          status: 'draft' | 'active' | 'inactive' | 'archived'
          is_featured: boolean
          sort_order: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          category?: string | null
          icon?: string | null
          color_gradient?: string | null
          status?: 'draft' | 'active' | 'inactive' | 'archived'
          is_featured?: boolean
          sort_order?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          category?: string | null
          icon?: string | null
          color_gradient?: string | null
          status?: 'draft' | 'active' | 'inactive' | 'archived'
          is_featured?: boolean
          sort_order?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      test_questions: {
        Row: {
          id: string
          test_id: string
          question_number: number
          question_text: string
          choice_a: string
          choice_b: string
          choice_a_tags: any
          choice_b_tags: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          test_id: string
          question_number: number
          question_text: string
          choice_a: string
          choice_b: string
          choice_a_tags?: any
          choice_b_tags?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          question_number?: number
          question_text?: string
          choice_a?: string
          choice_b?: string
          choice_a_tags?: any
          choice_b_tags?: any
          created_at?: string
          updated_at?: string
        }
      }
      test_results: {
        Row: {
          id: string
          user_id: string
          test_id: string
          result_type: string
          answers: any
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          test_id: string
          result_type: string
          answers: any
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          test_id?: string
          result_type?: string
          answers?: any
          completed_at?: string
          created_at?: string
        }
      }
      test_result_characters: {
        Row: {
          id: string
          test_id: string
          result_type: string
          name: string
          emoji: string | null
          summary: string | null
          description: any
          recommended_items: any
          compatible_types: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          test_id: string
          result_type: string
          name: string
          emoji?: string | null
          summary?: string | null
          description?: any
          recommended_items?: any
          compatible_types?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          result_type?: string
          name?: string
          emoji?: string | null
          summary?: string | null
          description?: any
          recommended_items?: any
          compatible_types?: any
          created_at?: string
          updated_at?: string
        }
      }
      uploads: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          upload_type: 'test_image' | 'result_image' | 'avatar' | 'banner'
          metadata: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          upload_type: 'test_image' | 'result_image' | 'avatar' | 'banner'
          metadata?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_path?: string
          file_size?: number
          mime_type?: string
          upload_type?: 'test_image' | 'result_image' | 'avatar' | 'banner'
          metadata?: any
          created_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          user_id: string | null
          event_name: string
          event_data: any
          page_path: string | null
          user_agent: string | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_name: string
          event_data?: any
          page_path?: string | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          event_name?: string
          event_data?: any
          page_path?: string | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      active_tests: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          category: string | null
          icon: string | null
          color_gradient: string | null
          status: 'draft' | 'active' | 'inactive' | 'archived'
          is_featured: boolean
          sort_order: number
          created_by: string | null
          created_at: string
          updated_at: string
          question_count: number
        }
      }
      test_popularity: {
        Row: {
          id: string
          title: string
          slug: string
          total_completions: number
          unique_users: number
          recent_completion_rate: number
        }
      }
    }
    Functions: {
      get_user_test_results: {
        Args: {
          user_uuid: string
        }
        Returns: {
          test_id: string
          test_title: string
          result_type: string
          completed_at: string
        }[]
      }
      get_test_statistics: {
        Args: {
          test_uuid: string
          days?: number
        }
        Returns: {
          date: string
          views: number
          starts: number
          completions: number
          shares: number
        }[]
      }
    }
  }
}

// Helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signUpWithEmail = async (email: string, password: string, name?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const uploadFile = async (
  file: File,
  bucket: string,
  path: string,
  options?: {
    cacheControl?: string
    upsert?: boolean
  }
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, options)
  
  return { data, error }
}

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}

export const deleteFile = async (bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([path])
  
  return { data, error }
}

// Database query helpers
export const getActiveTests = async () => {
  const { data, error } = await supabase
    .from('active_tests')
    .select('*')
    .order('sort_order', { ascending: true })
  
  return { data, error }
}

export const getTestBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  
  return { data, error }
}

export const getTestQuestions = async (testId: string) => {
  const { data, error } = await supabase
    .from('test_questions')
    .select('*')
    .eq('test_id', testId)
    .order('question_number', { ascending: true })
  
  return { data, error }
}

export const getTestResultCharacter = async (testId: string, resultType: string) => {
  const { data, error } = await supabase
    .from('test_result_characters')
    .select('*')
    .eq('test_id', testId)
    .eq('result_type', resultType)
    .single()
  
  return { data, error }
}

export const saveTestResult = async (result: {
  user_id: string
  test_id: string
  result_type: string
  answers: any
}) => {
  const { data, error } = await supabase
    .from('test_results')
    .insert(result)
    .select()
    .single()
  
  return { data, error }
}

export const getUserTestResults = async (userId: string) => {
  const { data, error } = await supabase
    .rpc('get_user_test_results', { user_uuid: userId })
  
  return { data, error }
}

export const trackAnalyticsEvent = async (event: {
  user_id?: string
  event_name: string
  event_data?: any
  page_path?: string
}) => {
  const { data, error } = await supabase
    .from('analytics_events')
    .insert({
      ...event,
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null
    })
  
  return { data, error }
}
