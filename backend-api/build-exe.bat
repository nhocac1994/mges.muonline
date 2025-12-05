@echo off
echo ========================================
echo Building Mu Online Backend API to EXE
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Building TypeScript...
call npm run build
if errorlevel 1 (
    echo ERROR: Failed to build TypeScript
    pause
    exit /b 1
)

echo.
echo [3/3] Building EXE file...
call npm run build:exe
if errorlevel 1 (
    echo ERROR: Failed to build EXE
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build completed successfully!
echo EXE file: dist\mu-backend-api.exe
echo ========================================
pause

