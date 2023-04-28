function startSearching() {
    const search = document.getElementById("search");
    const video = document.getElementById("searchVideo");
    search.addEventListener("click", e => {
      e.preventDefault();
      const API_KEY = "AIzaSyBJhedZSUT3KuwKbm2oyp7O1ub_GTBfGGA";
      const MAX_RESULTS = 100;
      fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${video.value}&part=snippet,id&type=video&order=viewCount&maxResults=${MAX_RESULTS}`
      )
        .then(response => response.json())
        .then(data => {
          if (data && data.items) {
            data.items.forEach(item => {
              const videoId = item.id.videoId;
              const videoTitle = item.snippet.title;
              const videoThumbnail = item.snippet.thumbnails.default.url;
              const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
              const videoCard = `
        <div class="col-md-4 mb-3">
          <div class="card">
            <a href="${videoLink}" target="_blank">
              <img class="card-img-top" src="${videoThumbnail}" alt="${videoTitle}">
            </a>
            <div class="card-body">
              <h5 class="card-title">${videoTitle}</h5>
            </div>
          </div>
        </div>
      `;
              document.querySelector("#videos").innerHTML += videoCard;
              video.value = "";
            });
          }
        })
        .catch(error => console.error(error));
    });
  }
  startSearching();