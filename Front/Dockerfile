FROM nginx:alpine

COPY . /usr/share/nginx/html

# Since this is pure frontend we need to generate the config.js file with help of envsubst that will substitute $VAR & ${VAR} environment variables with their values.
CMD envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js && nginx -g 'daemon off;'

# For Manual Run
# docker build -t my-frontend . 
# docker run -p 8081:80 --name="my-front" -e API_URL=http://localhost:8080/ -d my-frontend