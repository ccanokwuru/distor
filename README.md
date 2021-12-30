# Distor
A distributed collaborative editor that saves a copy of the document on each users

## Usage
clone this repo
Ensure Your have node and npm installed

## To run client
first
> cd client

install dependencies
> npm i

then
> npm run dev

the client is runnig now on PORT:3000

## To run server
first
> cd server

### fixing the websocket bug
Remove "exports" section (the part that was added here) of node_modules/y-websocket/package.json and then running 
> npx patch-package --exclude 'nothing' y-websocket  

Make sure 
> --exclude 'nothing' 

is included to include package.json changes in patch.

then
> npm run dev

the client is runnig now on PORT:5000

now we are golden
