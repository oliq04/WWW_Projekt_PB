document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('searchForm');
  const input     = document.getElementById('searchText');
  const resultsEl = document.getElementById('results');

  // debounce: wywoła funkcję dopiero 300ms po ostatnim keystroke
  let debounceTimer;
  function debounce(fn, delay) {
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fn(...args), delay);
    };
  }

  // główna funkcja wyszukująca
  async function searchBook(q) {
    q = q.trim().toLowerCase();
    if (!q) {
      resultsEl.innerHTML = '';
      return;
    }

    resultsEl.innerHTML = '<p>Ładowanie…</p>';

    try {
      // pobieramy wszystko raz
      const all = await fetch('/ksiazka')
        .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });

      // filtrowanie
      const found = all.filter(b =>
        b.tytul.toLowerCase().includes(q) ||
        b.autor.toLowerCase().includes(q)
      );

      if (found.length === 0) {
        resultsEl.innerHTML = '<p>Brak wyników.</p>';
        return;
      }

      // pokazujemy tylko pierwszy wynik
      const b = found[0];
      resultsEl.innerHTML = `
        <div class="book-item">
          <a href="#${b.id}" target="_blank" style="display:flex; gap:1rem; align-items:center;">
            ${b.link
              ? `<img src="${b.link}"
                      alt="Okładka ${b.tytul}"
                      style="width:120px; height:200px; object-fit:cover;"
                      onerror="this.style.display='none'">`
              : ''
            }
            <div>
              <h4 style="margin:0 0 .25rem;">${b.tytul}</h4>
              <p style="margin:0;"><strong>Autor:</strong> ${b.autor}</p>
              <p style="margin:0;"><strong>Rok wydania:</strong> ${b.rokWydania}</p>
            </div>
          </a>
        </div>
      `;
    } catch (err) {
      console.error(err);
      resultsEl.innerHTML = `<p>Błąd: ${err.message}</p>`;
    }
  }

  const liveSearch = debounce(q => searchBook(q), 300);

  // 1. Obsługa „klasycznego” submit (Enter lub klik)
  form.addEventListener('submit', e => {
    e.preventDefault();
    searchBook(input.value);
  });

  // 2. Obsługa „live” przy każdym wciśnięciu klawisza
  input.addEventListener('input', e => {
    liveSearch(e.target.value);
  });
});


