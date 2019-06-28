'use strict'

function getRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)

  .then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error ('No results found!');
  })
  .then (responseJson => {
    displayResults(responseJson)
  })

  .catch (err => {
    console.log(err);
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function displayResults(responseJson){
  $('#js-error-message').text('');

  $('.js-results').empty();

  let handle = `<h3>Handle: <span>${responseJson[0].owner.login}</span><h3>`

  $('.js-results').append(handle);

  for(let i=0; i < responseJson.length;i++) {
    $('.js-results').append(
      `<div class="result-item"><li><h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      </li></div>`)
  }
  $('.js-results').removeClass('hidden'); 

  }
  
function watchForm (){
  
  $('#js-form').submit(event => {
    event.preventDefault();
    const username = $('.js-username').val();
    getRepos(username);
  });
}

$(watchForm);