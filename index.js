if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("service-worker.js").then(
        function (registration) {
          console.log("Registrasi sw berhasil: ", registration.scope);
        },
        function (err) {
          console.log("Registrasi sw gagal: ", err);
        }
      );
    });
  }

document.addEventListener('DOMContentLoaded', () => {
    // Halaman awal tidak menampilkan film apapun
});

function showAddMovieDropdown() {
    document.getElementById('add-movie-dropdown').style.display = 'block';
}

function addSelectedMovie() {
    const movieSelect = document.getElementById('movie-select');
    const selectedOption = movieSelect.value;
    const [title, price, description] = selectedOption.split(' - ');

    const movie = { title, price, description };
    addMovieCard(movie);

    document.getElementById('add-movie-dropdown').style.display = 'none';
}

function addMovieCard(movie) {
    const moviesList = document.getElementById('movies-list');
    const movieCard = document.createElement('div');
    movieCard.classList.add('col-md-6', 'mb-4');

    let imageName = "";

    switch(movie.title) {
        case "Despicable Me 4":
            imageName = "despicable-me-4.jpg";
            break;
        case "MaXXXine":
            imageName = "maxxxine.jpg";
            break;
        case "Fly Me to The Moon":
            imageName = "fly-me-to-the-moon.jpg";
            break;
        case "Twisters":
            imageName = "twisters.jpg";
            break;
        case "Agak Laen":
            imageName = "agak-laen.jpg";
            break;
        case "Deadpool and Wolverine":
            imageName = "deadpool-and-wolverine.jpg";
            break;
        default:
            imageName = "placeholder.jpg";
    }

    const imagePath = `images/${imageName}`; // Path gambar

    movieCard.innerHTML = `
        <div class="card">
            <img src="${imagePath}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.description}</p>
                <p class="card-text"><strong>Price: ${movie.price}</strong></p>
                <button class="btn btn-danger" onclick="removeMovieCard(this)">Hapus Film</button>
            </div>
        </div>
    `;

    moviesList.appendChild(movieCard);
}

function removeMovieCard(button) {
    const cardToRemove = button.closest('.col-md-6');
    cardToRemove.remove();
}
