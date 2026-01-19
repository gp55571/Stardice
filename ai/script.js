// script.js - Ten plik dołącz do każdej podstrony (index, wyniki, kategorie)

document.addEventListener('DOMContentLoaded', () => {
    // Obsługujemy oba typy kart: siatkę (index) i listę (wyniki/kategorie)
    const allMovieCards = document.querySelectorAll('.movie-card, .result-card, .horizontal-card');

    allMovieCards.forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            // Pobieramy dane z karty (szukamy odpowiednich klas tekstowych)
            const titleElement = card.querySelector('.movie-name, .movie-title');
            const scoreElement = card.querySelector('.movie-score, .movie-rating');
            
            // Pobieramy tekst, usuwamy zbędne ikony/spacje
            const title = titleElement ? titleElement.innerText.trim() : "Nieznany tytuł";
            const score = scoreElement ? scoreElement.innerText.replace(/[^\d.]/g, '').trim() : "0.0";

            // Przekierowanie na stronę filmu z parametrami
            window.location.href = `film.html?title=${encodeURIComponent(title)}&score=${score}`;
        });
    });
});