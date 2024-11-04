@REM @echo off

@REM REM Navigate to the project directory
@REM cd %~dp0

@REM REM Check if node_modules exists, and if not, install dependencies
@REM IF NOT EXIST "node_modules" (
@REM     echo Installing dependencies...
@REM     npm install
@REM )

@REM REM Run the React development server
@REM npm run dev


@echo off
setlocal enabledelayedexpansion

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Navigate to the project directory
cd %~dp0

REM Check if package.json exists
if not exist "package.json" (
    echo Error: package.json not found!
    echo Please ensure you're in the correct project directory.
    pause
    exit /b 1
)

REM Check if node_modules exists, and if not, install dependencies
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if !ERRORLEVEL! neq 0 (
        echo Error: Failed to install dependencies!
        pause
        exit /b 1
    )
)

REM Run the React development server
echo Starting the React development server...
call npm run dev
if !ERRORLEVEL! neq 0 (
    echo Error: Failed to start the development server!
    pause
    exit /b 1
)

endlocal