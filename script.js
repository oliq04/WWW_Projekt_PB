const images = [
    "https://raw.githubusercontent.com/oliq04/WWW_Projekt_PB/refs/heads/main/images/04338A03865KS_HD.jpg.webp?token=GHSAT0AAAAAADBEEQZERR4EAYZ3ETINUBU2Z7FOQLQ",
    "https://raw.githubusercontent.com/oliq04/WWW_Projekt_PB/refs/heads/main/images/harry_potter_i_kamien_filozoficzny_duddle.webp?token=GHSAT0AAAAAADBEEQZFPLJHPSRHQYK3EO3AZ7FOWLQ",
    "https://raw.githubusercontent.com/oliq04/WWW_Projekt_PB/refs/heads/main/images/w512_u90.webp?token=GHSAT0AAAAAADBEEQZFUC3RUWC62ZTYIF2GZ7FOUQQ",
    "https://raw.githubusercontent.com/oliq04/WWW_Projekt_PB/refs/heads/main/images/konrad-wallenrod_m9C4Rls.webp?token=GHSAT0AAAAAADBEEQZFQYRLK6VDTMDHX4AKZ7FOV5A"
];

let index = 0;
function changeImage() {
    document.getElementById("zdjksiazki").src = images[index];
    index = (index + 1) % images.length;
}

changeImage(); // Załaduj pierwsze zdjęcie
setInterval(changeImage, 15000); // Zmieniaj co 15 sekundy

//https://ecsmedia.pl/c/harry-potter-i-kamien-filozoficzny-tom-1-b-iext161122719.jpg