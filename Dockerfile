FROM node:latest AS build
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn workspaces focus --production -A
RUN yarn add -D typescript
COPY . .
RUN yarn export

FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
