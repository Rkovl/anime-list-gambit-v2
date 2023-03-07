// //DEVELOPMENT SERVER
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

// const axios = require('axios');

// exports.handler = async function(event, context) {
//   let apiUrl = [
//     `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?ranking_type=tv&limit=500&fields=synopsis,start_date,mean`,
//     `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=1000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=1500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=2000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=2500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=3000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     `https://animelistgambit.netlify.app/.netlify/functions/corsAnywhere?url=https://api.myanimelist.net/v2/anime/ranking?offset=3500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`
//   ];
//   let dataArr = [];
//   for(const url of apiUrl) {
//     const response = await axios.get(url, {
//       headers: {
//         'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
//       },
//     });
//     console.log(response, "response")
//     // const data = await response.json();
//     // console.log(data,"data")
//     dataArr.push(response.data.data);
//   }

//   return {
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//     body: JSON.stringify(dataArr),
//   }
// }

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  }
}

// const axios = require('axios');

// exports.handler = async function(event, context) {
//   const url = event.queryStringParameters.url;
//   const response = await axios.get(url);
//   const data = response.data;

//   return {
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//     body: JSON.stringify(data),
//   };
// };
