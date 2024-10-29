@echo off
:: run.bat - Windows batch script to run React project
echo Starting React project setup...

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

:: Start the development server
echo Starting development server...
call npm run dev %*
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to start development server
    pause
    exit /b 1
)