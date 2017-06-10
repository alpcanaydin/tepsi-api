FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app

# Expose server port
EXPOSE 8080

# Run script
CMD [ "yarn", "start:dev" ]
