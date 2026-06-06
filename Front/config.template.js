window.APP_CONFIG = {
    API_URL: "${API_URL}"
}

// you can generate config.js file like this:
//export API_URL="http://localhost:8080/"
//echo "Api is under ${API_URL}" | envsubst
//Api is under http://localhost:8080/
//echo "Api is under ${API_URL}" | envsubst > config.js