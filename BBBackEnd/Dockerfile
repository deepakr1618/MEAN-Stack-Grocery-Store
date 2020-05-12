FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 3000

ENV USERNAME="test"
ENV PASSWORD="test"
CMD ["npm","start"]
