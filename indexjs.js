document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('searchForm');
  const input     = document.getElementById('searchText');
  const resultsEl = document.getElementById('results');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;

    resultsEl.innerHTML = '<p>Ładowanie wyników…</p>';

    try {
      // Uwaga: bez slash przed ?
      const url = `https://wolnelektury.pl/api/books?search=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // obsługa paginacji vs. czysta tablica
      const booksRaw = Array.isArray(data) ? data : data.results;

      // mapujemy na to, co potrzebujemy
      const books = booksRaw.map(b => ({
        kind:  b.kind,
        title: b.title,
        author:b.author,
        epoch: b.epoch,
        // jeśli jest prosty thumbnail, to bierzemy go, 
        // inaczej składamy pełny URL z cover
        cover: b.simple_thumb 
               || `https://wolnelektury.pl/media/${b.cover}`,
        url:   b.url
      }));

      if (books.length === 0) {
        resultsEl.innerHTML = '<p>Brak wyników.</p>';
        return;
      }

      // renderujemy z okładką, tytułem, autorem, rodzajem i epoką
      resultsEl.innerHTML = books.map(b => `
        <div class="book-item">
          <a href="${b.url}" target="_blank" class="book-link">
            <img src="${b.cover}" 
                 alt="Okładka ${b.title}" 
                 class="book-cover"
                 onerror="this.style.display='none'">
            <div class="book-info">
              <h4>${b.title}</h4>
              <p><strong>Autor:</strong> ${b.author}</p>
              <p><strong>Rodzaj:</strong> ${b.kind}</p>
              <p><strong>Epoka:</strong> ${b.epoch}</p>
            </div>
          </a>
        </div>
      `).join('');

    } catch (err) {
      console.error(err);
      resultsEl.innerHTML = `<p>Błąd: ${err.message}</p>`;
    }
  });
});