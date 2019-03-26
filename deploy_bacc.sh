#!/bin/bash

#
# bacc deploy script 
#

#### rsync ###################################################
#-r, --recursive recurse into directories		     #
#-l, --links copy symlinks as symlinks                       #
#-t, --times preserve modification times		     #
#-z, --compress compress file data during the transfer       #
#-u, --update skip files that are newer on the receiver      #
##############################################################

host=$1
pem=$2
workpath=$3
run=$4

#
# remove current backend sources
#
ssh -i $pem $host -tt 'bash -c -i "
mkdir -p '$workpath'/backend;
cd '$workpath'/backend;
rm *.js && rm *.log && rm package-lock.json
"'
#
# copy bacc front- and backend sources to server
#
rsync -rtuv --exclude='node_modules/' --exclude='.git/' --exclude='.idea/' --exclude='uploads/'--exclude='bacc.log' --exclude='package-lock.json' -e "ssh -i $pem"  /home/alan/workspace/bacc/dist/* $host:$workpath
#
# install new dependencies and restart backend service 
#
ssh -i $pem $host -tt 'bash -c -i "
cd '$workpath'/backend;
npm i;
npm run stop:'$run'; 
npm run start:'$run'
"'

