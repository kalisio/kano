#!/bin/bash
source .travis.env.sh

# Copy the required keys and update the mode
cp workspace/$FLAVOR/*.pem ~/.ssh/.
for KEY in `ls ~/.ssh/*.pem`; do
	chmod 600 $KEY
done

# Copy the ssh config file
cp workspace/$FLAVOR/ssh.config ~/.ssh/config
service sshd reload

# Create app directory if needed 
ssh REMOTE_SERVER mkdir -p $APP

# Deploy environment file
scp .env REMOTE_SERVER:~/$APP/.env

# Deploy compose files
scp deploy/app.yml REMOTE_SERVER:~/$APP/app.yml
scp deploy/app.swarm.yml REMOTE_SERVER:~/$APP/app.swarm.yml

# Deploy utilities
scp deploy/deploy-app.sh REMOTE_SERVER:~/$APP
scp deploy/remove-app.sh REMOTE_SERVER:~/$APP

# Deploy the stack
ssh REMOTE_SERVER "cd $APP; chmod u+x ./remove-app.sh; chmod u+x ./deploy-app.sh"
ssh REMOTE_SERVER "cd $APP; ./remove-app.sh; ./deploy-app.sh"

