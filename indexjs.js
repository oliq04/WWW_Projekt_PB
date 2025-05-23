document.addEventListener('DOMContentLoaded', () => {
  const formularzyk = document.getElementById('searchForm');
  const inpucik = document.getElementById('searchText');
  const wyniczek = document.getElementById('results');

  let opóźnienieTime;
  function opóźnienie(fn, opo){
    return(...args) => {
      clearTimeout(opóźnienieTime)
      opóźnienieTime = setTimeout(() => fn(...args), opo);
    };
  }

  async function wyszukiwanie(przeszukaj){
    przeszukaj = przeszukaj.trim().toLowerCase();
    if(!przeszukaj){
      wyniczek.innerHTML = '';
      return;
    }

    wyniczek.innerHTML = '<p>Ładowanie...</p>';

    try {
      const ksiazki = await fetch('/ksiazka').then(ksiazki => {
        if(!ksiazki.ok) throw new Error(ksiazki.status);
        return ksiazki.json();
      });

      const dopasowanie = ksiazki.filter(ksiazka => 
        ksiazka.tytul.toLowerCase().includes(przeszukaj) ||
        ksiazka.autor.toLowerCase().includes(przeszukaj) );

        if(dopasowanie.length === 0 ){
          wyniczek.innerHTML = '<p>Brak wyników.</p>';
          return;
        }

        wyswietlWyniki(dopasowanie[0]);
    }catch (error) {
      console.error(error);
      wyniczek.innerHTML = '<p>Błąd podczas wyszukiwania. Spróbuj ponownie.</p>';
    }
  }

  function wyswietlWyniki(book) {
    wyniczek.innerHTML = `
      <div class="book-item">
        <a href="#${book.id}" target="_blank" style="display:flex; gap:1rem; align-items:center;">
          ${book.link
            ? `<img src="${book.link}"
                    alt="Okładka ${book.tytul}"
                    style="width:120px; height:200px; object-fit:cover;"
                    onerror="this.style.display='none'">`
            : ''
          }
          <div>
            <h4 style="margin:0 0 .25rem;">${book.tytul}</h4>
            <p style="margin:0;"><strong>Autor:</strong> ${book.autor}</p>
            <p style="margin:0;"><strong>Rok wydania:</strong> ${book.rokWydania}</p>
          </div>
        </a>
      </div>
    `;
  }

    const opóźnieniewyszukiwania = opóźnienie(q => wyszukiwanie(q), 300);

  formularzyk.addEventListener('submit', wydarzenie => {
    wydarzenie.preventDefault();
    wyszukiwanie(inpucik.value);
  });

  formularzyk.addEventListener('input', wydarzenie => {
    opóźnieniewyszukiwania(wydarzenie.target.value);
  });

});