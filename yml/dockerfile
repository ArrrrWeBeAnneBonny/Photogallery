FROM node:13-alpine

WORKDIR /Users/michaelgallien/HackReactor/FEC/photogallery/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004
CMD [ "npm", "run", "start" ]