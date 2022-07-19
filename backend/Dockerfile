FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent
RUN npm install nodemon
RUN npm install bcrypt


COPY . .

EXPOSE 3500

CMD ["npm","run", "dev"]
