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

	# Deploy environment file
	scp .env ${SSH_USER}@${SSH_REMOTE}:~/${APP}/.env

	# Deploy compose files
	scp deploy/app.yml ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.yml
	scp deploy/app.swarm.yml ${SSH_USER}@${SSH_REMOTE}:~/${APP}/app.swarm.yml

  # Deploy configs
  scp -rp deploy/configs ${SSH_USER}@${SSH_REMOTE}:~/${APP}/configs

	# Deploy utilities
	scp deploy/scripts/backup_db.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}
	scp deploy/scripts/restore_db.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}
	scp deploy/scripts/deploy_stack.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}
	scp deploy/scripts/remove_statck.sh ${SSH_USER}@${SSH_REMOTE}:~/${APP}
	ssh ${SSH_USER}@${SSH_REMOTE} "cd ${APP}; chmod u+x ./remove_stack.sh; chmod u+x ./deploy_stack.sh; chmod u+x ./backup_db.sh; chmod u+x ./restore_db.sh; ./remove.sh; ./deploy.sh"
fi

