#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip deploy]"* ]]
then
	echo "Skipping deploy stage"
else
	source travis.env.sh
	eval "$(ssh-agent -s)"
	chmod 600 ssh.pem
	ssh-add ssh.pem
	ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_REMOTE} mkdir -p ${APP}
	scp .env ${SSH_USER}@${SSH_REMOTE}:~/${APP}/.env
	scp deploy/app.yml ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.yml
	scp deploy/app.swarm.yml ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.swarm.yml
	scp deploy/scripts/app.deploy.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.deploy.sh
	scp deploy/scripts/app.remove.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.remove.sh
	scp deploy/scripts/app.backup.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.backup.sh
	scp deploy/scripts/app.restore.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.restore.sh
	scp deploy/scripts/app.backup.yml ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.backup.yml
	ssh ${SSH_USER}@${SSH_REMOTE} "cd ${APP}; chmod u+x ./remove.sh; chmod u+x ./deploy.sh; chmod u+x ./backup.sh; chmod u+x ./restore.sh; ./remove.sh; ./deploy.sh"
fi

