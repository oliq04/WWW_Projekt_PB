const images = [
    "https://raw.githubusercontent.com/Kazu-yuki/zdjecia/refs/heads/main/images/04338A03865KS_HD.jpg.webp",
    "https://raw.githubusercontent.com/Kazu-yuki/zdjecia/refs/heads/main/images/harry_potter_i_kamien_filozoficzny_duddle.webp",
    "https://raw.githubusercontent.com/Kazu-yuki/zdjecia/refs/heads/main/konrad-wallenrod_m9C4Rls.webp",
    "https://raw.githubusercontent.com/Kazu-yuki/zdjecia/refs/heads/main/w512_u90.webp"
];

let index = 0;
function changeImage() {
    document.getElementById("zdjksiazki").src = images[index];
    index = (index + 1) % images.length;
}

changeImage(); // Załaduj pierwsze zdjęcie
setInterval(changeImage, 5000); // Zmieniaj co 15 sekundy


function zegar(){
        var data = new Date();
        var godzina = data.getHours();
        var min = data.getMinutes();
        var sec = data.getSeconds();
        var teraz = +godzina+
        ((min<10)?":0":":")+min+
        ((sec<10)?":0":":")+sec;
        document.getElementById("czas").innerHTML = teraz;
        setTimeout("zegar()", 1000);
}
zegar(); // Wywołaj funkcję zegar() przy załadowaniu strony



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