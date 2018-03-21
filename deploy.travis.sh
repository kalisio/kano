#!/bin/bash
eval "$(ssh-agent -s)"
chmod 600 ssh.pem
ssh-add ssh.pem
ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_REMOTE} mkdir -p kApp
scp docker-compose.yml ${SSH_USER}@${SSH_REMOTE}:~/kApp/docker-compose.yml
scp docker-compose.deploy.yml ${SSH_USER}@${SSH_REMOTE}:~/kApp/docker-compose.deploy.yml
scp kApp.env.sh ${SSH_USER}@${SSH_REMOTE}:~/kApp/kApp.env.sh
scp kApp.deploy.sh ${SSH_USER}@${SSH_REMOTE}:~/kApp/kApp.deploy.sh
scp kApp.remove.sh ${SSH_USER}@${SSH_REMOTE}:~/kApp/kApp.remove.sh
ssh ${SSH_USER}@${SSH_REMOTE} "cd kApp; ./kApp.remove.sh; ./kApp.deploy.sh"