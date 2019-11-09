FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node . .

#RUN yarn && yarn build

RUN if [ "$NODE_ENV" = "production" ]; \
		then yarn && yarn build; \
		fi

EXPOSE 3000

CMD [ "yarn", "start" ]
