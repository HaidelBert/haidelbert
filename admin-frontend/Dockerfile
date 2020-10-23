FROM node:latest

COPY . /app

RUN cd /app && npm ci && npm run build

FROM nginx:1.19.2-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

