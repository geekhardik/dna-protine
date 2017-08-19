# wget https://www.python.org/ftp/python/2.7.10/Python-2.7.10.tgz
# tar -zxvf  Python-2.7.10.tgz
# apt-get install build-essential checkinstall
# apt-get install libreadline-gplv2-dev libncursesw5-dev libgdbm-dev libc6-dev libbz2-dev  libsqlite3-dev tk-dev libssl-dev
# Python-2.7.10/`./configure`
# Python-2.7.10/`make altinstall`

 apt-get update || true
 sudo pip install Flask || true
 apt-get install nodejs || true
 apt-get install npm || true
 apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6 || true
 echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list || true
 apt-get update || true
 apt-get install -y mongodb-org || true
 python bio-protine.py 
 service mongod start
 npm start
