const request = require('axios');
//const AWS = require('aws-sdk');


module.exports.getNowHandler = (event, context, callback) => {

  let postZips = [10969,38110,80801,33423,65756,45345,12332]

  for (var i = 0, len = postZips.length; i < len; i++) {
    
    let data = JSON.stringify({
      plz : postZips[i]
    })

    request.post('https://www.getnow.de/plzsearch/index/post/?postcode=' + postZips[i],data,{
      maxRedirects: 0
    }).then(function (response) {

    })
    .catch(function (error) {

      let response = error.response;

      console.log("Test : " + error.response.request);
      
      if (response.status == 301) {
        console.log("Search successfull: 301");
        console.log("Location: " + error.response.headers.location);
      }else if (response.status == 302) {
        console.log("Search faild: 302");
      }else {
        console.log("Test error : " + response.status);
      }

      console.log("")

    });

  }

  callback(null, { message: 'Serverless: Your function executed successfully!', event });
};
