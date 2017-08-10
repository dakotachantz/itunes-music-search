/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
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
        <div class="table">TITLE</div>
        <div class="table">ARTIST</div>
        <div class="table">ALBUM</div>
      </div>
  `

  axios.get(url)
    .then(function (response) {
      console.log(response);

      let data;
      for (let i = 0; i < 15; i++) {
        data = response.data.results[i];

        searchResult = `
      <div class="row">
        <div class="table">${data.trackName}</div>
        <div class="table">${data.artistName}</div>
        <div class="table">${data.collectionName}</div>
      </div>
        `

        document.querySelector(".results").innerHTML += searchResult;
      }
    })
  document.querySelector(".results").innerHTML += searchResult;
});

document.querySelector(".row").addEventListener("click", function (e) {
  let nowPlaying = document.querySelector(".nowPlaying");
  if (e.target && e.target.nodeName == "DIV") {
    let songTitle = e.target.getAttribute("data-st");
    nowPlaying.innerHTML = `<p>Now Playing: ${songTitle}</p>`;

    let song = e.target.getAttribute("src");
    document.querySelector("audio").setAttribute('src', song);
  }
});

/* <span class="result">
        <div class="box" id="result-${[i]}"  data-st="${data.trackName}" src="${data.previewUrl}" style="background-image: url(${data.artworkUrl100}); height:100;width:100;">
        </div>
        <p class="title">${data.trackName}</p>
        <p class="artist">${data.artistName}</p> 
        </span> */