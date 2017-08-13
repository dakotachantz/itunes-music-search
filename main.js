let searchInput = document.querySelector(".searchInput");
let submit = document.querySelector(".submit");
let tracks;

submit.addEventListener("click", function (e) {
  let url = "https://itunes.apple.com/search?term=";
  url += searchInput.value;

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
      let data;
      for (let i = 0; i < response.data.results.length; i++) {
        data = response.data.results[i];
        searchResult = `
      <div class="row track" data-artist="${data.artistName}" data-album="${data.collectionName}" src="${data.previewUrl}" 
      data-song-title="${data.trackName}" data-album-cover="${data.artworkUrl100}" onclick="playSong()">
          <div class="table icon">
            <i class="fa fa-play-circle"></i>
          </div>
          <div class="table">${data.trackName}</div>
          <div class="table artist-data">${data.artistName}</div>
          <div class="table">${data.collectionName}</div>
      </div>
        `;
        document.querySelector(".results").innerHTML += searchResult;
      }
      let tracks = document.querySelectorAll(".track");

    })
  document.querySelector(".results").innerHTML += searchResult;
});

function getTrackElement(target) {
  if (target.hasAttribute("data-artist")) {
    return target;
  } else {
    getTrackElement(target.parentNode);
  }
}

function playSong() {
  let target = getTrackElement(event.target.parentNode);


  let musicPlayer = '';
  if (target && target.nodeName == "DIV" || target && target.nodeName == "I") {
    let songTitle = target.getAttribute("data-song-title");
    let artist = target.getAttribute("data-artist");
    let album = target.getAttribute("data-album");

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
    let albumCover = target.getAttribute("data-album-cover");
    document.querySelector("img").setAttribute('src', albumCover);
    let song = target.getAttribute("src");
    let audio = document.querySelector("audio");

    audio.setAttribute('src', song);

    var icon = document.querySelector("i");
    if (audio.getAttribute('src') === document.querySelector("i").getAttribute('src')) {
      document.querySelector("i").setAttribute("class", "fa fa-pause-circle");
    }


  }
}


