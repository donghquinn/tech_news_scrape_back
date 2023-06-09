#
# --- base image ---
FROM node:20.2-alpine3.17 as base

# install curl/timezone
RUN apk --no-cache add curl tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone

# set workdir
WORKDIR /home/node

# copy package.json, package-lock.json into image
COPY yarn.lock ./

# --- release ---
FROM base AS release

COPY . .

RUN yarn install

RUN yarn run build

ENTRYPOINT ["yarn", "start"]
