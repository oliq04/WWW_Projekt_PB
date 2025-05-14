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
      .then(ksiazka => console.log("Dodano książkę:", ksiazka))
  }
 
