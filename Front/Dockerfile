FROM nginx:alpine

COPY . /usr/share/nginx/html

CMD envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js && nginx -g 'daemon off;'