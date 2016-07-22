FROM node:6.0
MAINTAINER Stanislav Gumeniuk <i@vigo.su>

ADD . /code
WORKDIR /code
RUN npm i && npm i -g pm2
CMD pm2 start app.js --no-daemon
EXPOSE 8888
