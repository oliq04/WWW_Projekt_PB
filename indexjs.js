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

  async function wyszukiwanie(przeszukaj) {
    przeszukaj = przeszukaj.trim().toLowerCase();
    if (!przeszukaj) {
      localStorage.setItem('dopasowaneKsiazki', JSON.stringify([]));
      return;
    }

    try {
      const ksiazki = await fetch('/ksiazka').then(r => r.json());

      const regex = new RegExp(przeszukaj, 'i');
      const dopasowanie = ksiazki.filter(ksiazka =>
        regex.test(ksiazka.tytul) || regex.test(ksiazka.autor)
      );

      localStorage.setItem('dopasowaneKsiazki', JSON.stringify(dopasowanie));

      zmienWidocznoscKsiazek();
    } catch (error) {
      console.error(error);
    }
  }

  function zmienWidocznoscKsiazek() {
    const dopasowaneKsiazki = JSON.parse(localStorage.getItem('dopasowaneKsiazki')) || [];
    const wszystkieKsiazki = document.querySelectorAll('.ramka-dla-obiektu');

    wszystkieKsiazki.forEach(ksiazka => {
        ksiazka.style.display = 'none'; 
    });

    dopasowaneKsiazki.forEach(ksiazka => {
        const ksiazkaDiv = document.querySelector(`.ramka-dla-obiektu img[alt="${ksiazka.tytul}"]`);
        if (ksiazkaDiv) {
            ksiazkaDiv.closest('.ramka-dla-obiektu').style.display = 'block';
        }
    });
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
