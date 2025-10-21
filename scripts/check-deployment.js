#!/usr/bin/env node

/**
 * 배포 상태 확인 및 자동 재배포 스크립트
 * GitHub Actions와 Vercel 배포 상태를 확인하고 에러 시 자동 재배포
 */

const { execSync } = require('child_process');
const https = require('https');

// 설정
const GITHUB_REPO = 'lsk7209/temon_new';
const VERCEL_PROJECT_ID = 'temon'; // Vercel 프로젝트 ID
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 30000; // 30초

/**
 * GitHub Actions 상태 확인
 */
async function checkGitHubActions() {
  return new Promise((resolve, reject) => {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/actions/runs?per_page=5`;
    
    https.get(url, {
      headers: {
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github.v3+json'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const runs = JSON.parse(data);
          const latestRun = runs.workflow_runs[0];
          
          console.log(`📊 최신 GitHub Actions 실행 상태: ${latestRun.status}`);
          console.log(`🎯 결론: ${latestRun.conclusion}`);
          console.log(`⏰ 실행 시간: ${new Date(latestRun.created_at).toLocaleString('ko-KR')}`);
          
          resolve({
            status: latestRun.status,
            conclusion: latestRun.conclusion,
            html_url: latestRun.html_url,
            created_at: latestRun.created_at
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Vercel 배포 상태 확인
 */
async function checkVercelDeployment() {
  return new Promise((resolve, reject) => {
    const url = `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&limit=5`;
    
    https.get(url, {
      headers: {
        'User-Agent': 'Node.js',
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN || ''}`
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const deployments = JSON.parse(data);
          const latestDeployment = deployments.deployments[0];
          
          console.log(`🚀 최신 Vercel 배포 상태: ${latestDeployment.state}`);
          console.log(`🌐 배포 URL: ${latestDeployment.url}`);
          console.log(`⏰ 배포 시간: ${new Date(latestDeployment.createdAt).toLocaleString('ko-KR')}`);
          
          resolve({
            state: latestDeployment.state,
            url: latestDeployment.url,
            createdAt: latestDeployment.createdAt,
            ready: latestDeployment.ready
          });
        } catch (error) {
          console.log('⚠️ Vercel API 토큰이 설정되지 않았습니다. GitHub Actions만 확인합니다.');
          resolve(null);
        }
      });
    }).on('error', (error) => {
      console.log('⚠️ Vercel API 확인 실패:', error.message);
      resolve(null);
    });
  });
}

/**
 * 배포 상태 확인
 */
async function checkDeploymentStatus() {
  console.log('🔍 배포 상태 확인 중...\n');
  
  try {
    // GitHub Actions 상태 확인
    const githubStatus = await checkGitHubActions();
    
    // Vercel 배포 상태 확인
    const vercelStatus = await checkVercelDeployment();
    
    return {
      github: githubStatus,
      vercel: vercelStatus,
      hasError: githubStatus.conclusion === 'failure' || 
                (vercelStatus && vercelStatus.state === 'ERROR')
    };
  } catch (error) {
    console.error('❌ 배포 상태 확인 실패:', error.message);
    return { hasError: true, error: error.message };
  }
}

/**
 * 자동 재배포 실행
 */
async function autoRedeploy() {
  console.log('🔄 자동 재배포 시작...\n');
  
  try {
    // Git 상태 확인
    console.log('📋 Git 상태 확인 중...');
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (gitStatus.trim()) {
      console.log('⚠️ 커밋되지 않은 변경사항이 있습니다.');
      console.log('💡 변경사항을 커밋한 후 다시 시도해주세요.');
      return false;
    }
    
    // 빈 커밋으로 재배포 트리거
    console.log('📦 재배포를 위한 빈 커밋 생성 중...');
    execSync('git commit --allow-empty -m "fix: 자동 재배포 - 배포 오류 수정"');
    
    console.log('📤 GitHub에 푸시 중...');
    execSync('git push origin main');
    
    console.log('✅ 자동 재배포 완료!');
    console.log('🌐 배포 URL: https://temon.kr');
    console.log('📊 GitHub Actions: https://github.com/lsk7209/temon_new/actions');
    
    return true;
  } catch (error) {
    console.error('❌ 자동 재배포 실패:', error.message);
    return false;
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🚀 배포 상태 모니터링 시작\n');
  
  // 배포 상태 확인
  const status = await checkDeploymentStatus();
  
  if (status.hasError) {
    console.log('\n❌ 배포 오류 감지됨!');
    console.log('🔄 자동 재배포를 시도합니다...\n');
    
    const redeploySuccess = await autoRedeploy();
    
    if (redeploySuccess) {
      console.log('\n✅ 자동 재배포 성공!');
      console.log('⏰ 30초 후 상태를 다시 확인합니다...\n');
      
      // 30초 대기 후 재확인
      setTimeout(async () => {
        console.log('🔍 재배포 후 상태 확인 중...\n');
        await checkDeploymentStatus();
      }, 30000);
    } else {
      console.log('\n❌ 자동 재배포 실패');
      console.log('💡 수동으로 문제를 해결해주세요.');
    }
  } else {
    console.log('\n✅ 배포 상태 정상');
    console.log('🎉 모든 시스템이 정상 작동 중입니다!');
  }
}

// 스크립트 실행
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  checkDeploymentStatus,
  autoRedeploy,
  checkGitHubActions,
  checkVercelDeployment
};
