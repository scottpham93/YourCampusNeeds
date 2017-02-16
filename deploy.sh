#!/bin/bash

echo 'Staging local changes...'
git add .
echo 'Resetting those changes...'
git reset --hard
echo 'Pulling latest version...'
git pull

echo 'Building project for deployment...'
ng build

echo 'Retrieving certificate and key...'
cp /etc/letsencrypt/live/yourcampusneeds.com/fullchain.pem ~/YourCampusNeeds/fullchain.pem
cp /etc/letsencrypt/live/yourcampusneeds.com/privkey.pem ~/YourCampusNeeds/privkey.pem

echo 'Spinning up http-server now...'
http-server ./dist -p 443 --ssl --cert 'fullchain.pem' --key 'privkey.pem'
