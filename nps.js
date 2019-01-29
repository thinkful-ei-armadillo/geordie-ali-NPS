'use strict';

// put your own value below!
const apiKey = 'mapni7xujPvFutDVpHTza00RkwrZVaJlaFVqbH4w';
const searchURL =
    'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  const HTMLString = responseJson.data.map(obj => `<li>Name: ${obj.name} <br> Description: ${obj.description} <br> Website Link: ${obj.url}</li>`);
  $('#results-list').html(HTMLString); 
  $('#results').removeClass('hidden');
}

function getParks(stateCode, limit = 10) {
  const params = {
    stateCode,
    limit: limit,
    language: 'en',
    // api_key: apiKey
  };
    //   const options = {
    //     headers: {
    //       'X-Api-Key': apiKey
    //     }
  //   };
  const queryString = formatQueryParams(params);
  const url = `${searchURL}?${queryString}&api_key=mapni7xujPvFutDVpHTza00RkwrZVaJlaFVqbH4w`;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }})
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function parkForm() {
  $('#js-form').on('submit', event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val() - 1;
    getParks(searchState, maxResults);
  });
}

$(parkForm);

