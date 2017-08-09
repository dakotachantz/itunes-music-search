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

let url = "https://itunes.apple.com/search?term=";


submit.addEventListener("click", function (e) {


  url += searchInput.value;
  console.log(url);

  e.preventDefault();

  document.querySelector(".row").innerHTML = '';

  axios.get(url)
    .then(function (response) {
      console.log(response);

      let data;
      for (let i = 0; i < 15; i++) {
        data = response.data.results[i];
        // if (data.thumbnail === "") {
        //   data.thumbnail = "./recipe_default.jpeg";
        // }

        let searchResult = `
        <span class="result">
        <div class="box" style="background-image: url(${data.artworkUrl100}); height:100;width:100;">
        </div>
        <p class="title">${data.trackName}</p>
        <p class="artist">${data.artistName}</p>
        </span>
        `
        document.querySelector(".row").innerHTML += searchResult;
        // searchInput.value = "";
      }
    })
});