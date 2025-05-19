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

  function wyslij()
  {
     
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

window.onload = function() {
  fetch("http://localhost:3000/ksiazka")
    .then(response => response.json())
    .then(data => {
      data.forEach(ksiazka => {
        nowyObiekt(ksiazka);
      });
    });
};
