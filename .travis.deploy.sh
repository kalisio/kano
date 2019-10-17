#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip deploy]"* ]]
then
	echo "Skipping deploy stage"
else
	source .travis.env.sh

	#
	# Deploy the app
	#
	travis_fold start "deploy"

	cp workspace/$FLAVOR/ssh.pem ssh.pem
 
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
	scp deploy/mongodb.yml REMOTE_SERVER:~/$APP/mongodb.yml
	scp deploy/mongodb.swarm.yml REMOTE_SERVER:~/$APP/mongodb.swarm.yml

	# Deploy utilities
	scp deploy/deploy-app.sh REMOTE_SERVER:~/$APP
	scp deploy/remove-app.sh REMOTE_SERVER:~/$APP

	# Deploy the stack
	ssh REMOTE_SERVER "cd $APP; chmod u+x ./remove-app.sh; chmod u+x ./deploy-app.sh"
	ssh REMOTE_SERVER "cd $APP; ./remove-app.sh; k-swarm-prune; ./deploy-app.sh"

	travis_fold end "deploy"
fi

