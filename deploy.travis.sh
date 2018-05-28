#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip deploy]"* ]]
then
	echo "Skipping deploy stage"
else
	source env.travis.sh
	eval "$(ssh-agent -s)"
	chmod 600 ssh.pem
	ssh-add ssh.pem
	ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_REMOTE} mkdir -p kapp
	scp .env ${SSH_USER}@${SSH_REMOTE}:~/kapp/.env
	scp docker-compose.yml ${SSH_USER}@${SSH_REMOTE}:~/kapp/docker-compose.yml
	scp docker-compose.deploy.yml ${SSH_USER}@${SSH_REMOTE}:~/kapp/docker-compose.deploy.yml
	scp app.deploy.sh ${SSH_USER}@${SSH_REMOTE}:~/kapp/app.deploy.sh
	scp app.remove.sh ${SSH_USER}@${SSH_REMOTE}:~/kapp/app.remove.sh
	scp app.backup.sh ${SSH_USER}@${SSH_REMOTE}:~/kapp/app.backup.sh
	scp app.restore.sh ${SSH_USER}@${SSH_REMOTE}:~/kapp/app.restore.sh
	scp app.backup.yml ${SSH_USER}@${SSH_REMOTE}:~/kapp/app.backup.yml
	ssh ${SSH_USER}@${SSH_REMOTE} "cd kapp; chmod u+x ./app.remove.sh; chmod u+x ./app.deploy.sh; chmod u+x ./app.backup.sh; chmod u+x ./app.restore.sh; ./app.remove.sh; ./app.deploy.sh"
fi

