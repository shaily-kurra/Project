var axios = require("axios").default;

const readline = require('readline-sync');
let movie = readline.question("Enter the movie name:");


var options = {
  method: 'GET',
  url: 'https://ott-details.p.rapidapi.com/search',
  params: {title: movie, page: '1'},
  headers: {
    'x-rapidapi-host': 'ott-details.p.rapidapi.com',
    'x-rapidapi-key': '9e52e29703msh83e166587b4b3cdp1e2651jsn567d3ed24591'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});