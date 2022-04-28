var userFormEl = document.querySelector('#user-form');
var artistInputEl = document.querySelector('#artist');
var albumInputEl = document.querySelector('#album');
var resultsContainerEl = document.querySelector('#results-container');
var resultSearchTerm = document.querySelector('#result-search-term');


var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var artist = artistInputEl.value.trim();
  
    if (artist) {
      getArtist(artist);
  
      // clear old content
      resultsContainerEl.textContent = '';
      artistInputEl.value = '';
    } else {
      alert('Please enter an artist');
    }
  };


var getArtist = function(artist) {
    //format the github api url
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'genius.p.rapidapi.com',
            'X-RapidAPI-Key': '284cc868e3mshb53d5d29c0255a9p11cbc8jsn4a2488211b96'
        }
    };
    
    fetch('https://genius.p.rapidapi.com/search?q=' + artist, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
    // var apiURL = "https://genius.p.rapidapi.com/" + artist + "/:id/songs"
    // make a get request to url
    
    
//     fetch("https://genius.p.rapidapi.com/" + artist, {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Host': 'genius.p.rapidapi.com',
//             'X-RapidAPI-Key': '284cc868e3mshb53d5d29c0255a9p11cbc8jsn4a2488211b96'
//         }
//     })
//       .then(function(response) {
//         // request was successful
//         if (response.ok) {
//           console.log(response);
//           response.json().then(function(data) {
//             console.log(data);
//             // displayAlbums(data, artist);
//           });
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })
//       .catch(function(error) {
//         alert('Unable to connect to Musitory');
//       });
//   };

  // add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);