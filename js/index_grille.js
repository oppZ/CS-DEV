async function load_grille()
{
    var json = await fetch("../data/predefini.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json_recu) {
        return json_recu;
    })

    var template_contenu = document.getElementById("choix");
    for (let element of json.nom)
    {
        let clone = document.importNode(template_contenu.content, true);
        clone.children[0].children[0].innerHTML = clone.children[0].children[0].innerHTML
            .replace("{{titre}}", element["titre"]);
        clone.children[0].children[1].outerHTML = clone.children[0].children[1].outerHTML
            .replace("{{img_source}}", element["image"]);
        clone.children[0].outerHTML = clone.children[0].outerHTML
            .replace("{{composants}}", element["composants"]);
        clone.children[0].children[2].innerHTML = clone.children[0].children[2].innerHTML
            .replace("{{description}}", element["description"]);
        clone.children[0].children[3].innerHTML = clone.children[0].children[3].innerHTML
            .replace("{{prix}}", element["prix"]);
        
        document.getElementById("choix_principal").appendChild(clone);

    }
}