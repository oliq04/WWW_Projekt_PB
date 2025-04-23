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