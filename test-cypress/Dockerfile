FROM cypress/base:14.16.0

WORKDIR /usr/chat/app/test

COPY . .

RUN apt-get update && \
  npm install -g update && \
  chown -R www-data:www-data /usr/chat/app/test

RUN npm install && \ 
  npx cypress install