@echo off
rem Xuat CV ra PDF (A4, 2 trang) bang Microsoft Edge, ghi de vao web\assets\cv\
rem Cach dung: bam dup file nay sau khi sua cv-vi.html / cv-en.html
cd /d "%~dp0"
set EDGE="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
%EDGE% --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 --print-to-pdf="%~dp0..\web\assets\cv\CV-Tran-Quang-Vinh-VI.pdf" "file:///%~dp0cv-vi.html"
%EDGE% --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 --print-to-pdf="%~dp0..\web\assets\cv\CV-Tran-Quang-Vinh-EN.pdf" "file:///%~dp0cv-en.html"
echo Da xuat xong 2 file PDF vao web\assets\cv\
