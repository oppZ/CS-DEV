$.getJSON("../data/produits.json", function(json) {
    for (let type in json) {
        for (let clef of json[type]) {
            var fragment = create("<li><input type='radio' name=" + type + " id=" + clef["id"] + " value=" + clef["id"] + " onclick='modificationCanvas(this.value)'><label for=" + clef["id"] + ">" + clef["nom"] + "</label><br></li>");
            document.getElementById(type).appendChild(fragment);
        }
    }

    let params = new URLSearchParams(location.search);
    composants = params.get('composants');
    if (composants != null) {
        let liste = composants.split(",")
        for (loop of liste) {
            document.getElementById(loop).checked = true;
            modificationCanvas(loop);
        }
    }
});

function addImageProcess(src){
    return new Promise((resolve, reject) => {
      let imgg = new Image()
      imgg.onload = () => resolve(imgg)
      imgg.onerror = reject
      imgg.src = src
    })
}
  

function validateForm() {
    let typeBase = document.forms["customisation"]["typeBase"].value;
    let typeGlacage = document.forms["customisation"]["typeGlacage"].value;
    let typeSaupoudrage = document.forms["customisation"]["typeSaupoudrage"].value;
    if (typeBase=="" || typeGlacage=="" || typeSaupoudrage==""){
        alert("Veuillez remplir tout les champs");
        return false;
    }
    location.href="panier.html?typeBase=" + typeBase + "&typeGlacage=" + typeGlacage + "&typeSaupoudrage=" + typeSaupoudrage;
}
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

async function affichageImage(img,nomCanvas) {
    var ctx = document.getElementById(nomCanvas).getContext("2d");
    let imageCanvas = await addImageProcess(img);
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    ctx.drawImage(imageCanvas,0,0);
}

function modificationCanvas(img) {
    let typeBase = document.forms["customisation"]["typeBase"].value;
    let name = document.getElementById(img).getAttribute("name");
    if ((typeBase == "beignet" || typeBase == "donut") && img != "aucunGlacage" && img != "aucunSaupoudrage") {
        img = "../images/articles/" + typeBase + "/" + typeBase + "_" + img + ".png";
        if (name == "typeBase") {
            affichageImage(img,"canvasTypeBase");
        }
        else if (name == "typeGlacage") {
            affichageImage(img,"canvasTypeGlacage");
        }
        else if (name == "typeSaupoudrage") {
            affichageImage(img,"canvasTypeSaupoudrage");
        }
    }
    else if (img == "aucunGlacage") {
        var ctx = document.getElementById("canvasTypeGlacage").getContext("2d");
        var imageCanvas = new Image;
        imageCanvas.src = "../images/articles/beignet/beignet_fraise.png";
        ctx.clearRect(0,0,imageCanvas.width, imageCanvas.height);
    }
    else if (img == "aucunSaupoudrage") {
        var ctx = document.getElementById("canvasTypeSaupoudrage").getContext("2d");
        var imageCanvas = new Image;
        imageCanvas.src = "../images/articles/beignet/beignet_fraise.png";
        ctx.clearRect(0,0,imageCanvas.width, imageCanvas.height);
    }
}