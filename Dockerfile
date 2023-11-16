# From base image node
FROM node:16

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Prepare container
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y mc

# Copying all the files from your file system to container file system
#COPY package*.json ./

# Install all dependencies
#RUN npm install --loglevel verbose && npm install -g typescript tsc-watch --loglevel verbose

## Copy other files too
#COPY . .

## Prebuild
#RUN npm run prebuild

## Expose the port
EXPOSE 3000

# Command to run app when intantiate an image
# ENTRYPOINT ["tail", "-f", "/dev/null"]
