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
	scp deploy/scripts/deploy.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}/deploy.sh
	scp deploy/scripts/remove.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}/remove.sh
	scp deploy/scripts/backup.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}/backup.sh
	scp deploy/scripts/restore.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}/restore.sh
	scp deploy/scripts/backup.yml ${SSH_USER}@${SSH_REMOTE}:~/${APP}/backup.yml
	ssh ${SSH_USER}@${SSH_REMOTE} "cd ${APP}; chmod u+x ./remove.sh; chmod u+x ./deploy.sh; chmod u+x ./backup.sh; chmod u+x ./restore.sh; ./remove.sh; ./deploy.sh"
fi

