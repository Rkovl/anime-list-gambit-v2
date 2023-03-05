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

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const url = event.queryStringParameters.url;
  const response = await fetch(url);
  const data = await response.text();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: data,
  };
};