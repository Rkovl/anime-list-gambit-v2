//DEVELOPMENT SERVER
// const corsAnywhere = require('cors-anywhere');

// const port = 8080;
// corsAnywhere.createServer().listen(port, () => {
//   console.log(`CORS Anywhere proxy server listening on port ${port}`);
// });

// const cors_proxy = require('cors-anywhere');

// exports.handler = cors_proxy.createServer({
//     originWhitelist: [], 
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).handler;

// exports.handler = async function(event, context) {
//   return{
//     statusCode: 200,
//   }
// }

const axios = require('axios');

exports.handler = async (event) => {
  const { url } = event.queryStringParameters;
  const response = await axios.get(url);
  const { data, status, headers } = response;
  const responseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444',
    ...headers,
  };

  return {
    statusCode: status,
    headers: responseHeaders,
    body: JSON.stringify(data),
  };
};