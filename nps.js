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
  for (let i = 0; i < responseJson.parks.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson.parks[i].data[0].name}</h3>
      <p>${responseJson.parks[i].data[0].description}</p>
      <a href='${responseJson.parks[i].data[0].url}'>Website Link</a>
      </li>`
    );
  } 
  $('#results').removeClass('hidden');
}

function getParks(state, limit = 10) {
  const params = {
    q: state,
    language: 'en',
    // api_key: apiKey
  };
  const options = {
    headers: {
      'X-Api-Key': apiKey
    }
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url, options)
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
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchState, maxResults);
  });
}

$(parkForm);

//added the below code with TA to test why our API key won't load on our server

function getNews(query, maxResults = 10) {
  const params = {
    q: query,
    language: "en",
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey
    })
  };

  fetch(url, options)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}