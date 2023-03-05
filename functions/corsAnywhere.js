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

exports.handler = async function(event, context) {
  return{
    statusCode: 200,
  }
}