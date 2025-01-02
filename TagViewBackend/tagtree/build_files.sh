echo " BUILD START"
python3 --version
echo "PIP INSTALL STARTED"
python3 -m pip install --upgrade pip
echo "PIP INSTALL ENDED"
echo "PACKAGES INSTALL STARTED"
python3  -m pip install -r requirements.txt
echo "PACKAGES INSTALL ENDED"
python3 manage.py collectstatic  --noinput --clear
echo " BUILD END"