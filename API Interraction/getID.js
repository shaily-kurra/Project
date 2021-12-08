var axios = require("axios").default;

const readline = require('readline-sync');
let movie = readline.question("Enter the movie name:");
let movie_id = '';


var options = {
  method: 'GET',
  url: 'https://ott-details.p.rapidapi.com/search',
  params: {title: movie, page: '1'},
  headers: {
    'x-rapidapi-host': 'ott-details.p.rapidapi.com',
    'x-rapidapi-key': '9e52e29703msh83e166587b4b3cdp1e2651jsn567d3ed24591'
  }
};

// console.log(response.data[results]);




axios.request(options).then(function (response) {
   var movie_id = response.data.results[0].imdbid;
   var options_1 = {
    method: 'POST',
    url: 'https://gowatch.p.rapidapi.com/lookup/title/imdb_id',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'gowatch.p.rapidapi.com',
      'x-rapidapi-key': '9e52e29703msh83e166587b4b3cdp1e2651jsn567d3ed24591'
    },
    data: {id: String(movie_id), type: 'movie', country: 'us'}
  };


  axios.request(options_1).then(function (response) {
    console.log(response.data);
    const fs = require('fs');
    let data = JSON.stringify(response.data);
    fs.writeFileSync('data.json', data);

    /**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
    const bucketName = 'movie_details';

// The path to your file to upload
    const filePath = './data.json';

// The new ID for your GCS file
    const destFileName = 'details';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function uploadFile() {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile().catch(console.error);

  }).catch(function (error) {
    console.error(error);
  });


}).catch(function (error) {
	console.error(error);
});





