// 1. Wczytanie filmów z JSON
let movies = [];

fetch('filmy.json')
  .then(res => res.json())
  .then(data => {
    const moviesTable = data.objects.find(obj => obj.name === "movies");
    movies = moviesTable.rows.map(row => ({
      id: row[0],
      title: row[1],
      year: row[2],
      imdb: row[4],
      description: row[5]
    }));
  })
  .catch(err => console.error("Błąd wczytywania JSON:", err));

// 2. Utworzenie kontenera na podpowiedzi
const searchInput = document.getElementById('search-input');
const suggestionBox = document.createElement('div');
suggestionBox.classList.add('autocomplete-suggestions');
searchInput.parentNode.appendChild(suggestionBox);

// 3. Wyświetlanie podpowiedzi przy wpisywaniu
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestionBox.innerHTML = '';

    if (!query || query.length < 2) return;

    const filtered = movies.filter(movie => movie.title.toLowerCase().includes(query));

    filtered.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('autocomplete-suggestion');
        div.innerHTML = `<strong>${movie.title}</strong> (${movie.year}) - IMDb: ${movie.imdb}`;
        
        div.addEventListener('click', () => {
            searchInput.value = movie.title;
            suggestionBox.innerHTML = '';
            window.location.href = `wyniki.html?query=${encodeURIComponent(movie.title)}`;
        });

        suggestionBox.appendChild(div);
    });
});

// 4. Zamknięcie sugestii przy kliknięciu poza input
// 4. Zamknięcie sugestii przy kliknięciu poza input
document.addEventListener('click', (e) => {
    if (e.target !== searchInput && !suggestionBox.contains(e.target)) {
        suggestionBox.innerHTML = '';
    }
});
