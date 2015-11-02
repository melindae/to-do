git init
npm install -g grunt-cli
sudo chown -R $USER /usr/local
npm install

*** Git ***

git config user.name "yourName"
git config user.email "you@email.com"

add and commit

git remote add origin https://github.com/yourName/yourProjectName.git
git push -u origin master


*** Heroku ***

wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh

git remote add heroku git@heroku.com:your-app.git
 -or-
heroku git:remote -a yourHerokuSite

git push heroku master
* git push -f heroku master // if necessary