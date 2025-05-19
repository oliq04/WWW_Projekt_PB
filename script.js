

function darkMode()
{
    document.documentElement.classList.toggle("darkmode");
}

//wyszukiwarka API wolnelektury
document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('searchForm');
  const input     = document.getElementById('searchText');
  const resultsEl = document.getElementById('results');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;

    // Pokaż komunikat „ładowanie”
    resultsEl.innerHTML = '<p>Ładowanie wyników…</p>';

    try {
      const url  = `https://wolnelektury.pl/api/books/?search=${encodeURIComponent(q)}`;
      const res  = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Wyciągamy tylko tytuł i autora
      const books = data.results.map(b => ({
        title:  b.title,
        author: b.author
      }));

      if (books.length === 0) {
        resultsEl.innerHTML = '<p>Brak wyników.</p>';
        return;
      }

      // Renderujemy listę
      resultsEl.innerHTML = books.map(b => `
        <div class="book-item">
          <h4>${b.title}</h4>
          <p>Autor: ${b.author}</p>
        </div>
      `).join('');

    } catch (err) {
      console.error(err);
      resultsEl.innerHTML = '<p>Błąd przy wyszukiwaniu. Spróbuj ponownie.</p>';
    }
  });
});