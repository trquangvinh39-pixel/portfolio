@echo off
rem Xuat anh bia LinkedIn va Zalo (do net gap doi) vao banners\out\
cd /d "%~dp0"
if not exist out mkdir out
set EDGE="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
%EDGE% --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=1584,396 --virtual-time-budget=6000 --screenshot="%~dp0out\linkedin-banner.png" "file:///%~dp0banner.html?v=linkedin"
%EDGE% --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=1280,800 --virtual-time-budget=6000 --screenshot="%~dp0out\zalo-cover.png" "file:///%~dp0banner.html?v=zalo"
echo Da xuat xong vao banners\out\
