FROM node

WORKDIR /front_cubs

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
