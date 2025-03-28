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
setInterval(changeImage, 4000); // Zmieniaj co 15 sekundy

//https://ecsmedia.pl/c/harry-potter-i-kamien-filozoficzny-tom-1-b-iext161122719.jpg