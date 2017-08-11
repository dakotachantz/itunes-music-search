let searchInput = document.querySelector(".searchInput");
let submit = document.querySelector(".submit");

submit.addEventListener("click", function (e) {
  let url = "https://itunes.apple.com/search?term=";
  url += searchInput.value;
  console.log(url);

  e.preventDefault();

  document.querySelector(".results").innerHTML = '';
  let searchResult = `
   <div class="row">
        <div class="first table icon"></div>
        <div class="first table">TITLE</div>
        <div class="first table artist-data">ARTIST</div>
        <div class="first table">ALBUM</div>
      </div>
  `

  axios.get(url)
    .then(function (response) {
      console.log(response);

      let data;
      for (let i = 0; i < response.data.results.length; i++) {
        data = response.data.results[i];

        searchResult = `
      <div class="row" artist="${data.artistName}" album="${data.collectionName}" src="${data.previewUrl}" 
      song-title="${data.trackName}" album-cover="${data.artworkUrl100}">
      <div class="select"></div>
          <div artist="${data.artistName}" album="${data.collectionName}" src="${data.previewUrl}" 
      song-title="${data.trackName}" album-cover="${data.artworkUrl100}" class="table icon"><i artist="${data.artistName}" album="${data.collectionName}" src="${data.previewUrl}" 
      song-title="${data.trackName}" album-cover="${data.artworkUrl100}" class="fa fa-play-circle"></i>
          </div>
          <div artist="${data.artistName}" album="${data.collectionName}" src="${data.previewUrl}" 
      song-title="${data.trackName}" album-cover="${data.artworkUrl100}" class="table">${data.trackName}
          </div>
          <div artist="${data.artistName}" album="${data.collectionName}" src="${data.previewUrl}" 
      song-title="${data.trackName}" album-cover="${data.artworkUrl100}" class="table artist-data">${data.artistName}
          </div>
          <div artist="${data.artistName}" album="${data.collectionName}" src="${data.previewUrl}" 
      song-title="${data.trackName}" album-cover="${data.artworkUrl100}" class="table">${data.collectionName}
          </div>
      </div>
        `;

        document.querySelector(".results").innerHTML += searchResult;
      }
    })
  document.querySelector(".results").innerHTML += searchResult;
});

document.querySelector(".results").addEventListener("click", function (e) {
  let musicPlayer = '';
  if (e.target && e.target.nodeName == "DIV" || e.target && e.target.nodeName == "I") {
    let songTitle = e.target.getAttribute("song-title");
    let artist = e.target.getAttribute("artist");
    let album = e.target.getAttribute("album");

    musicPlayer = `
    <div class="nowPlaying">
    <img class="cover" src="" alt="Cover">
      <div class="info">
        <p class="title">${songTitle}</p>
        <p class="artist">Artist - ${artist}</p>
        <p class="album">Album - ${album}</p>
      </div>
    </div>
    <audio class="music-player" controls="controls" src="" autoplay>></audio>
    `

    document.querySelector(".player").innerHTML = musicPlayer;
    let albumCover = e.target.getAttribute("album-cover");
    document.querySelector("img").setAttribute('src', albumCover);
    let song = e.target.getAttribute("src");
    let audio = document.querySelector("audio");

    audio.setAttribute('src', song);

    var icon = document.querySelector("i");
    if (audio.getAttribute('src') === document.querySelector("i").getAttribute('src')) {
      document.querySelector("i").setAttribute("class", "fa fa-pause-circle");
    }


  }
});

