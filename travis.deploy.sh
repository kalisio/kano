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
	scp deploy/scripts ${SSH_USER}@${SSH_REMOTE}:~/${APP}
	scp deploy/configs ${SSH_USER}@${SSH_REMOTE}:~/${APP}/configs
	ssh ${SSH_USER}@${SSH_REMOTE} "cd ${APP}; chmod u+x ./remove_stack.sh; chmod u+x ./deploy_stack.sh; chmod u+x ./backup_db.sh; chmod u+x ./restore_db.sh; ./remove.sh; ./deploy.sh"
fi

