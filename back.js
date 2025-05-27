fetch("http://localhost:3000/ksiazka")
  .then(response => {
    if (!response.ok) throw new Error("Błąd HTTP: " + response.status);
    return response.json();
  })
  .then(data => {
    console.log("Otrzymane dane:", data);
  })
  .catch(error => {
    console.error("Wystąpił błąd:", error);
  });


  function dodajKsiazke()
  {
    document.getElementById("popup").style.display = "flex";
  }
    
  function ZamknijPopup()
  {
    document.getElementById("popup").style.display = "none";
  }

  function wyslij()
  {
   const inputs = document.querySelectorAll(".formInput");

    for (const input of inputs) {
      if (input.value.trim() === "") {
        alert("Pole " + input.name + " nie może być puste! Uzupełnij wszystkie pola.");
        return; 
      }
      if (input.name === "link" && !input.value.startsWith("http")) {
        alert("Link musi zaczynać się od 'http' lub 'https'.");
        return; 
      }
    }
     
    var tytul = document.getElementById("tytul").value;
    var autor = document.getElementById("autor").value;
    var rok = document.getElementById("rok").value;
    var link = document.getElementById("link").value;


    fetch("http://localhost:3000/ksiazka", {
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        tytul:tytul,
        autor:autor,
        rokWydania:rok,
        link:link
      }) 
    })
      .then(response => response.json())
      .then(ksiazka => {
      console.log("Dodano książkę:", ksiazka);
      nowyObiekt(ksiazka); 
      document.getElementById("popup").style.display = "none";
  })

  }
 

function nowyObiekt(ksiazka)
{
    const miejsce = document.getElementById("usereview");

    const tyt = document.createElement("p");
    tyt.className = "tytul-ksiazki";

    const divKsiazka = document.createElement("div");
    divKsiazka.className = "ramka-dla-obiektu";

    const imgObiekt = document.createElement("img");
    imgObiekt.className = "obrazek-ksiazki";

  imgObiekt.src=ksiazka.link;
  imgObiekt.alt=ksiazka.tytul;


  tyt.innerText=ksiazka.tytul;

  divKsiazka.appendChild(tyt);
  divKsiazka.appendChild(imgObiekt);

  miejsce.appendChild(divKsiazka);
  
}
function asideObrazy(ksiazka) {
    const miejsce = document.getElementById("reklamaZdjęcia");

    const tyt = document.createElement("p");
    tyt.className = "aside-tytul-ksiazki";

    const divKsiazka = document.createElement("div");
    divKsiazka.className = "ramka-dla-aside";

    const imgObiekt = document.createElement("img");
    imgObiekt.className = "obrazek-aside";

    imgObiekt.src = ksiazka.link;
    imgObiekt.alt = ksiazka.tytul;
    tyt.innerText = ksiazka.tytul;

    divKsiazka.appendChild(tyt);
    divKsiazka.appendChild(imgObiekt);
    miejsce.appendChild(divKsiazka);

}

window.addEventListener('load', () => {
    fetch('http://localhost:3000/ksiazka')
        .then(r => r.json())
        .then(async data => {

            /* 1. Tworzymy elementy */
            data.forEach((ksiazka, i) => {
                if (i < 8) asideObrazy(ksiazka);   // 8 kart w pasku
                nowyObiekt(ksiazka);               // wszystko do sekcji głównej
            });

            /* 2. Zaczekaj, aż wszystkie obrazki w pasku są załadowane --------------- */
            const container = document.querySelector('.reklama');
            await Promise.all(
                Array.from(container.querySelectorAll('img'))
                    .filter(img => !img.complete)
                    .map(img =>
                        new Promise(res => { img.addEventListener('load', res); })
                    )
            );

            /* 3. POLICZEMY dynamicznie szerokość karty + rzeczywisty gap ------------ */
            const cards = Array.from(container.querySelectorAll('.ramka-dla-aside'));

            const styles = getComputedStyle(container);
            // w elastycznym wierszu gap w poziomie to column-gap (lub samo gap)
            const gap = parseFloat(styles.columnGap || styles.gap) || 0;

            const cardW = cards[0].offsetWidth + gap;

            /* 4. Auto-scroll --------------------------------------------------------- */
            let busy = false;

            setInterval(() => {
                if (busy) return;
                busy = true;

                container.scrollBy({ left: cardW, behavior: 'smooth' });

                /* po zakończeniu animacji przerzuć kartę i cofnij scroll */
                setTimeout(() => {
                    const first = container.firstElementChild;
                    container.appendChild(first);
                    container.scrollLeft -= cardW;
                    busy = false;
                }, 700); // >= czas smooth-scroll (ms)
            }, 30000000);   // co 3 s
        })
        .catch(console.error);
});

