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

exports.handler = async function(event, context) {
  const url = event.queryStringParameters.url;
  const response = await axios.get(url);
  const data = response.data;

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(data),
  };
};