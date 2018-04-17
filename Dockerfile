FROM ubuntu:xenial

RUN apt-get update
RUN apt-get install -y ffmpeg curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
  && apt-get install -y nodejs

WORKDIR /opt/app
COPY . .
RUN npm install --production

VOLUME "/var/convert/"

ENTRYPOINT [ "node", "entrypoint.js", "/var/convert/" ]
# CMD [ "node", "entrypoint.js" ]
