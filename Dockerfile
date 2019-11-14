FROM node:12.13.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY . .
EXPOSE 8080
CMD [ "yarn", "docker:start" ]