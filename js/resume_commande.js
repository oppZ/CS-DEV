async function remplir_panier() {
    var json = await fetch("../data/choix.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json_recu) {
        return json_recu;
    })

    var template_contenu = document.getElementById("panier");
    let clone = document.importNode(template_contenu.content, true);
    clone.children[0].innerHTML = clone.children[0].innerHTML
        .replace("{{titre}}", json["nom"][0]["titre"]);
    clone.children[1].innerHTML = clone.children[1].innerHTML
        .replace("{{img_src}}", "");
    clone.children[2].innerHTML = clone.children[2].innerHTML
        .replace("{{prix_de_base}}", json["nom"][0]["prix"]);
    document.getElementById("commande_panier").appendChild(clone);
}

function supprimer_element()
{
    return null;
}