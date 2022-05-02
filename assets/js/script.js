var userFormEl = document.querySelector('#user-form');
var artistInputEl = document.querySelector('#artist');
var albumInputEl = document.querySelector('#album');
var resultsContainerEl = document.querySelector('#results-container');
var resultSearchTerm = document.querySelector('#result-search-term');
var hideInfoBoxesEl = document.querySelectorAll('.info-boxes');
var youtubeContainerEl = document.querySelector('#youtube-container');
var filterButtonsEl = document.querySelector('#filter-buttons');
//var btn = document.querySelector('#button')



var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    
   //hide info boxes
   hideInfoBoxesEl.forEach(el => el.setAttribute("style", "display:none"));
       

    // get value from input element
    var artist = artistInputEl.value.trim();
  
    if (artist) {
      getArtist(artist);
      searchByKeyword(artist);
  
      // clear old content
      resultsContainerEl.textContent = '';
      artistInputEl.value = '';

      youtubeContainerEl.textContent = '';
    } else {
      alert('Please enter an artist');
    }
    
    
  };

  var buttonClickHandler = function (event) {
    var filter = event.target.getAttribute('data-language');
  
    if (filter) {
      getArtist(filter);
      searchByKeyword(filter)
      resultsContainerEl.textContent = '';
      var imageEl = document.createElement('img');
      imageEl.setAttribute("src", hits[i].result.song_art_image_url)
      imageEl.classList.add("song-art")
      highlightsEl.appendChild(imageEl);
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
        .then(data => {
            console.log(data)
            displayHighlights(data.response.hits, artist)
        })
        //.then(response => console.log(response))
        .catch(err => console.error(err));
        //displayHighlights(data, artist)
}

var displayHighlights = function(hits,searchTerm) {
    // check if api returned any highlights
    if (hits.length === 0) {
      resultsContainerEl.textContent = 'No songs found.';
      return;
    }
  
    resultSearchTerm.textContent = searchTerm;
    //var artist_id = hits[0].result.primary_artist
    // loop over highlights
    for (var i = 0; i < hits.length; i++) {

      // format highlights name
      var highlightsName = hits[i].result.full_title;
      console.log(highlightsName);
  
      // create a container for each highlight
      var highlightsEl = document.createElement("div");
      highlightsEl.classList = 'list-item column is-3 is-justify-content-space-between is-align-content-center';
    
  
      // create a span element to hold highlight name
      var titleEl = document.createElement('p');
      titleEl.classList = 'album-title'
      titleEl.textContent = highlightsName;
  
      // append to container
      highlightsEl.appendChild(titleEl);
  
      // create a status element
      var statusEl = document.createElement('span');
      statusEl.classList = 'is-flex-direction-row is-align-content-center';

      var imageEl = document.createElement('img');
      imageEl.setAttribute("src", hits[i].result.song_art_image_url)
      imageEl.classList.add("song-art")
      highlightsEl.appendChild(imageEl);

    var linkEl = document.createElement('a')
    var ButtonEl = document.createElement('button')
    ButtonEl.classList = 'button is-block'
    linkEl.setAttribute("href", hits[i].result.url)
    linkEl.setAttribute("target","_blank")
    ButtonEl.textContent = "Get lyrics";

    linkEl.appendChild(ButtonEl);

    highlightsEl.appendChild(linkEl);
      // append container to the dom
    resultsContainerEl.appendChild(highlightsEl);

    
        
    }
};

// var showHide = function() {
//     var div = document.getElementById('#info-boxes');
//     if (div.style.display == 'none') {
//       div.style.display = '';
//     }
//     else {
//       div.style.display = 'none';
//     }
//   }



    // var apiURL = "https://genius.p.rapidapi.com/" + artist + "/:id/songs"
    // make a get request to url
    
    
    // fetch('https://genius.p.rapidapi.com/search?q=' + artist, options)
      
    //   .then(function(response) {
    //     // request was successful
    //     if (response.ok) {
    //       console.log(response);
    //       response.json().then(function(data) {
    //         console.log(data);
    //         // displayAlbums(data, artist);
    //       });
    //     } else {
    //       alert('Error: ' + response.statusText);
    //     }
    //   })
    //   .catch(function(error) {
    //     alert('Unable to connect to Musitory');
    //   });
  

  // add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);


//get youtube api
    
  function searchByKeyword(artist) { 
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        'X-RapidAPI-Key': 'f9fa5ec95cmsha156214863c7e4dp16eefejsn65733400f7ba'
      }
    }
    
    fetch('https://youtube-v31.p.rapidapi.com/search?q='+ artist +'songs&part=id%2Cid&regionCode=US&maxResults=5', options) //&order=date
      .then(response => response.json())
      .then(data => {
        console.log(data)
        displayArtistVideo(data.items, artist)
    })
    //.then(response => console.log(response))
    .catch(err => console.error(err));
    //displayHighlights(data, artist)
}
  
var displayArtistVideo = function(items) {
    // check if api returned any highlights
    if (items.length === 0) {
        youtubeContainerEl.textContent = 'No videos found.';
        return;
      }

      for (var i = 0; i < items.length; i++) {

        // format highlights name
        var videoId = items[i].id.videoId;
        console.log(videoId);

        var youtubeEl = document.createElement("iframe");
        youtubeEl.setAttribute("src", "https://www.youtube.com/embed/" + videoId);
        youtubeEl.style.width = "300px";
        youtubeEl.style.height = "200px";
        youtubeContainerEl.appendChild(youtubeEl);

}

}
filterButtonsEl.addEventListener('click', buttonClickHandler);
