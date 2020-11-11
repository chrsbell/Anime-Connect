#!/bin/bash

# sync changes to the remote machine
while inotifywait -r -e modify,create,delete,move /home/chris/GitHub/anime-list/hrsf130-mvp-starter; do
	sudo rsync -e 'ssh -i anilist.pem' -a --exclude=node_modules /home/chris/GitHub/anime-list/hrsf130-mvp-starter ec2-user@ec2-54-219-51-1.us-west-1.compute.amazonaws.com:/home/ec2-user
done
