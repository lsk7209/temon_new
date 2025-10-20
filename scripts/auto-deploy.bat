@echo off
chcp 65001 >nul

echo 🚀 자동 배포 시작...

REM 현재 시간 가져오기
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "TIMESTAMP=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

REM 변경사항 확인
git diff --quiet
if %errorlevel% equ 0 (
    git diff --cached --quiet
    if %errorlevel% equ 0 (
        echo 📝 변경사항이 없습니다.
        exit /b 0
    )
)

REM 변경사항 추가
echo 📦 변경사항 추가 중...
git add .

REM 커밋 메시지 생성
set "COMMIT_MSG=feat: 자동 배포 - %TIMESTAMP%"
set "COMMIT_MSG=%COMMIT_MSG%"
set "COMMIT_MSG=%COMMIT_MSG% - 개발 완료 자동 커밋"
set "COMMIT_MSG=%COMMIT_MSG% - 새로운 기능 및 개선사항 반영"
set "COMMIT_MSG=%COMMIT_MSG% - 빌드 및 배포 준비 완료"

REM 커밋
echo 💾 커밋 중...
git commit -m "%COMMIT_MSG%"

REM 푸시
echo 📤 GitHub에 푸시 중...
git push origin main

REM 결과 확인
if %errorlevel% equ 0 (
    echo ✅ 자동 배포 완료!
    echo 🌐 배포 URL: https://temon.kr
    echo 📊 GitHub Actions: https://github.com/lsk7209/temon_new/actions
    echo ⏰ 배포 시간: %TIMESTAMP%
) else (
    echo ❌ 배포 실패
    exit /b 1
)

pause
