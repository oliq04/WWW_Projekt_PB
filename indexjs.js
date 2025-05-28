document.addEventListener('DOMContentLoaded', () => {
    const formularzyk = document.getElementById('searchForm');
    const inpucik = document.getElementById('searchText');
    const wyniczek = document.getElementById('results');
    const favButton = document.getElementById("favButton");

    let opóźnienieTime;
    function opóźnienie(fn, opo){
        return (...args) => {
            clearTimeout(opóźnienieTime);
            opóźnienieTime = setTimeout(() => fn(...args), opo);
        };
    }

    async function wyszukiwanie(przeszukaj) {
        przeszukaj = przeszukaj.trim().toLowerCase();
        const wszystkieKsiazki = document.querySelectorAll('.ramka-dla-obiektu');

        
        if (!przeszukaj) {
            wszystkieKsiazki.forEach(ksiazka => ksiazka.style.display = 'block');
            wyniczek.innerHTML = ''; 
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

            
            if (dopasowanie.length === 0) {
                wyniczek.innerHTML = '<p>Brak wyników.</p>';
            } else {
                wyniczek.innerHTML = ''; 
            }

            zmienWidocznoscKsiazek();

            favButton.disabled = dopasowanie.length !== 1;

            if (dopasowanie.length === 1) {
                favButton.dataset.ksiazka = JSON.stringify(dopasowanie[0]);
            }

        } catch (error) {
            console.error(error);
        }
    }

    function zmienWidocznoscKsiazek() {
        const dopasowaneKsiazki = JSON.parse(localStorage.getItem('dopasowaneKsiazki')) || [];
        const wszystkieKsiazki = document.querySelectorAll('.ramka-dla-obiektu');

        
        wszystkieKsiazki.forEach(ksiazka => ksiazka.style.display = 'none');

        
        if (dopasowaneKsiazki.length === 0) return;

        
        dopasowaneKsiazki.forEach(ksiazka => {
            const ksiazkaDiv = document.querySelector(`.ramka-dla-obiektu img[alt="${ksiazka.tytul}"]`);
            if (ksiazkaDiv) {
                ksiazkaDiv.closest('.ramka-dla-obiektu').style.display = 'block';
            }
        });
    }

    function dodajDoUlubionych(ksiazka){
    let ulubione = JSON.parse(localStorage.getItem('ulubioneKsiazki')) || [];

    if (!ulubione.some(fav => fav.id === ksiazka.id)) {
        ulubione.push(ksiazka);
        localStorage.setItem('ulubioneKsiazki', JSON.stringify(ulubione));
        alert(`Dodano "${ksiazka.tytul}" do ulubionych!`);
    } else {
        alert(`"${ksiazka.tytul}" już jest w ulubionych!`);
    }
  }
    document.getElementById("favButton").addEventListener("click", () => {
       if(!favButton.dataset.ksiazka) return;

       const ksiazka = JSON.parse(favButton.dataset.ksiazka);
        dodajDoUlubionych(ksiazka);
    });

    const opóźnieniewyszukiwania = opóźnienie(q => wyszukiwanie(q), 300);

    formularzyk.addEventListener('submit', wydarzenie => {
        wydarzenie.preventDefault();
        wyszukiwanie(inpucik.value);
    });

    formularzyk.addEventListener('input', wydarzenie => {
        opóźnieniewyszukiwania(wydarzenie.target.value);
    });

    function dodajDoUlubionych(ksiazka) {
    let ulubione = JSON.parse(localStorage.getItem('ulubioneKsiazki')) || [];

    if (!ulubione.some(fav => fav.id === ksiazka.id)) {
        ulubione.push(ksiazka);
        localStorage.setItem('ulubioneKsiazki', JSON.stringify(ulubione));
        alert(`Dodano "${ksiazka.tytul}" do ulubionych!`);
    } else {
        alert(`"${ksiazka.tytul}" już jest w ulubionych!`);
    }
}
    });
