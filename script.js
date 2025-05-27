

function darkMode() {
  const root = document.documentElement;
  const isDark = root.classList.toggle("darkmode");

  localStorage.setItem("darkmode", isDark ? "true" : "false");
}

window.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("darkmode");
  if (savedMode === "true") {
    document.documentElement.classList.add("darkmode");
  }
});



function nowyObiekt(ksiazka)
{
    const miejsce = document.getElementById("usereview");

    const tyt = document.createElement("p");
    tyt.className = "tytul-ksiazki";

    const divKsiazka = document.createElement("div");
    divKsiazka.className = "ramka-dla-obiektu";

    const imgObiekt = document.createElement("img");
    imgObiekt.className = "obrazek-ksiazki";

    const przycisk = document.createElement("button");
    przycisk.className = "przycisk-usun";
    przycisk.innerText = "Usuń";
    przycisk.onclick = function ()
    {
      localStorage.removeItem(ksiazka.tytul);
      miejsce.removeChild(divKsiazka);
    }

    imgObiekt.src=ksiazka.link;
    imgObiekt.alt=ksiazka.tytul;


    tyt.innerText=ksiazka.tytul;

    divKsiazka.appendChild(tyt);
    divKsiazka.appendChild(imgObiekt);

    miejsce.appendChild(divKsiazka);
  
}