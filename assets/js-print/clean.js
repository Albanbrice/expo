function clean(content) {

    /* supprimer les images de comparaison */
    let imgComparaison = content.querySelectorAll(".img-comparaison");
    for (let i = 0; i < imgComparaison.length; i++) {
        imgComparaison[i].parentNode.removeChild(imgComparaison[i]);
    }

    /* Ajout de sauts de livres dans des titres */
    let listnotice = content.getElementById("notices-list-all");
    listnotice.querySelectorAll('[data-num-inventaire="Ra 122"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Tête d’adolescent <br>(Tiberius Gemellus ?)';
    listnotice.querySelectorAll('[data-num-inventaire="Ra 68 (1)"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Tête de jeune garçon <br>(C. Fulvius Plautus Hortensianus ?)';
    listnotice.querySelectorAll('[data-num-inventaire="Ra 69"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Portrait d’homme anciennement <br>dit Sévère Alexandre';
    listnotice.querySelectorAll('[data-num-inventaire="Ra 32"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Repos de deux faunes <br>dans un paysage';
    listnotice.querySelectorAll('[data-num-inventaire="2000.411.1"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Chapiteau corinthien <br>à tête de feuillagee';

    /* Déplacement d'éléments dans la liste des notices */
    let move1 = listnotice.querySelectorAll('[data-num-inventaire="Ra 36 - Ra 37"]')[0]
    content.querySelector("#notices-list-04-03").appendChild(move1);

    /* Microtypo */
    let texts = content.querySelectorAll("p");
    for (let n = 0; n < texts.length; n++) {     
         
        let contentText = texts[n].innerHTML.replace('&nbsp;:', '<span class="fine">&nbsp;</span>:').replace('« ', '«<span class="fine">&nbsp;</span>').replace(' »', '<span class="fine">&nbsp;</span>»');
        
        texts[n].innerHTML = contentText;
    }

    /* aria-hidden */
    let printElems = content.querySelectorAll(".print");
    for (let p = 0; p < printElems.length; p++) {
        printElems[p].setAttribute('aria-hidden', 'true');
    }


}