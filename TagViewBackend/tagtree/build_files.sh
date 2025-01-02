echo " BUILD START"
echo "PYTHON VERSION"
python --version
echo "PYTHON 3 VERSION"
python3 --version
echo "PIP INSTALL STARTED"
python3.9 -m pip install --upgrade pip
echo "PIP INSTALL ENDED"
echo "PACKAGES INSTALL STARTED"
python3.9  -m pip install -r requirements.txt
echo "PACKAGES INSTALL ENDED"
python3.9 manage.py collectstatic  --noinput --clear
echo " BUILD END"