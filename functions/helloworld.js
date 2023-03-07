// // const corsAnywhere = require('cors-anywhere');
// const axios = require('axios');

// exports.handler = async function (event){
//     console.log(event,'event EVENTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
    
//     console.log(event.queryStringParameters.url)
//     // const port = 8080;
//     // corsAnywhere.createServer().listen(port, () => {
//     // console.log(`CORS Anywhere proxy server listening on port ${port}`);
//     // });
//     // const gatherData = async ()=> {
//     //     let url = 'https://api.myanimelist.net/v2/anime/10357?fields=rank,mean,alternative_titles'
//     //     const response = await axios.get(url,{
//     //         header: {
//     //             'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
//     //         }
//     //     })
//     //     console.log(response)
//     // }
//     // gatherData()


//     // let apiUrl = [
//     //     `api.myanimelist.net/v2/anime/ranking?ranking_type=tv&limit=500&fields=synopsis,start_date,mean`,
//     //     `api.myanimelist.net/v2/anime/ranking?offset=500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     //     `api.myanimelist.net/v2/anime/ranking?offset=1000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     //     `api.myanimelist.net/v2/anime/ranking?offset=1500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     //     `api.myanimelist.net/v2/anime/ranking?offset=2000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     //     `api.myanimelist.net/v2/anime/ranking?offset=2500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     //     `api.myanimelist.net/v2/anime/ranking?offset=3000&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`,
//     //     `api.myanimelist.net/v2/anime/ranking?offset=3500&ranking_type=tv&limit=500&fields=synopsis%2Cstart_date%2Cmean`
//     //   ];
//     //   let dataArr = [];
//     //   for(const url of apiUrl) {
//     //     const response = await axios.get(url, {
//     //       headers: {
//     //         'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
//     //       },
//     //     });
//     //     console.log(response, "response")
//     //     // const data = await response.json();
//     //     // console.log(data,"data")
//     //     dataArr.push(response.data.data);
//     //   }
//     //   console.log(dataArr, 'dataArr')

//     const url = event.queryStringParameters.url;
//     const response = await axios.get(url,{
//         header: {
//             'X-MAL-CLIENT-ID': 'e1a909433d30ddee822fc956e58d7444'
//         }
//     });
//     console.log(response)
//     // const data = await response.text();

//     return {
//         statusCode: 200,
//         body: JSON.stringify({hello: 'dataArr'})
//     }
// }

import axios from 'axios'

export const handler = async (event, context) => {
  let url = "http://api.myanimelist.net/v2" + event.queryStringParameters.url;
  try {
    // Filter out headers
    let filterOut = ["host", "x-forwarded-for", "client-ip"]
    let headers = Object.keys(event.headers)
      .filter(key => !filterOut.includes(key))
      .reduce((obj, key) => {
        obj[key] = event.headers[key]
        return obj
      }, {})
    const response = await axios.get(url, {
      headers: headers,
    })
    // Get text response
    const data = await response.data
    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    }
  } catch (error) {
    // Get text response
    const data = await error.data
    return {
      statusCode: error.status,
      body: JSON.stringify(data)
    }
  }
}