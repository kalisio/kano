FROM  node:8

MAINTAINER Luc Claustres <luc.claustres@kalisio.xyz>

WORKDIR /opt/kapp
COPY . /opt/kapp

RUN git clone https://github.com/kalisio/kCore.git && cd kCore && yarn install && yarn link && cd .. && yarn link kCore
RUN git clone https://github.com/kalisio/kTeam.git && cd kTeam && yarn install && yarn link kCore && yarn link && cd .. && yarn link kTeam
RUN git clone https://github.com/kalisio/kNotify.git && cd kNotify && yarn install && yarn link kCore && yarn link && cd .. && yarn link kNotify
RUN git clone https://github.com/kalisio/kMap.git && cd kMap && yarn install && yarn link kCore && yarn link && cd .. && yarn link kMap
RUN git clone https://github.com/kalisio/kEvent.git && cd kEvent && yarn install && yarn link kCore && yarn link && cd .. && yarn link kEvent
RUN yarn install
RUN npm run build

WORKDIR /opt/kapp/api

RUN yarn install
RUN yarn link kCore
RUN yarn link kTeam
RUN yarn link kNotify
RUN yarn link kMap
RUN yarn link kEvent
RUN npm run build

EXPOSE 8081

CMD [ "npm", "run", "prod" ]
