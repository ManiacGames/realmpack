@echo off
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py launch.py
  goto end
)
where python >nul 2>nul
if not errorlevel 1 (
  python launch.py
  goto end
)
where node >nul 2>nul
if not errorlevel 1 (
  node launch.cjs
  goto end
)
echo Install Python 3 or Node.js, then run START-REALMPACK.bat again.
:end
pause
