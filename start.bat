@echo off
title Discord.js v14 Template - Global Bot Starter
:main
cls
echo ------------------------------------------
echo Starting Discord Bot...
echo Project: discord.js-v14-template
echo Powered by Aiko Development
echo ------------------------------------------
node index.js
echo.
echo [!] Bot has stopped or crashed.
echo [!] Restarting in 5 seconds...
timeout /t 5 >nul
goto main
