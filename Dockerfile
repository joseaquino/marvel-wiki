FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node . .

RUN yarn && yarn build

ENV MARVEL_PRIVATE_KEY=ENTER_YOU_PRIVATE_KEY

EXPOSE 3000

CMD [ "yarn", "start" ]
