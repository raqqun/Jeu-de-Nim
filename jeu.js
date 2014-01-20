function init() {
    'use strict';
    var nbAllTotal = parseInt(document.getElementById('nbAllTotal').value, null), 
        div = document.getElementById('jeu'),
        body = document.body, 
        pInit = document.getElementById('init'), 
        print = document.getElementById('print'), 
        enlever = document.createElement('p');
    
    enlever.id = "enlever";
    enlever.innerHTML = "<button type=\"button\" onclick=\"jouer()\"> Enlever</button> <input id=\"nbAllEnlever\" type=\"text\" size=\"3\">allumette(s)";
    print.innerHTML = "";
    if (isNaN(nbAllTotal) || nbAllTotal < 1) {
        print.innerHTML = "Choix Incorect! Entrez un nombre superieur a zero!";
    }
    else if (nbAllTotal > 0) {
        print.innerHTM = "";

        div.removeChild(document.getElementById('flame'));
        body.insertBefore(enlever, pInit);
        body.removeChild(pInit);
    }

    for (var i=0; i<nbAllTotal; i = i + 1) {
        var img = document.createElement('img');
        img.src = "allumette.gif";
        img.className = "all";
        div.appendChild(img);
    }
}

function enleverAll(nbAllEnlever, allumettes) {
    'use strict';
    var div = document.getElementById('jeu');

    if (nbAllEnlever > 0 && nbAllEnlever < 4 && nbAllEnlever <= allumettes.length) {
        for (var i = 0; i < nbAllEnlever; i = i + 1) {
            div.removeChild(allumettes[0]);
        }
    }
    else if (nbAllEnlever > allumettes.length) {
        document.getElementById('print').innerHTML = "Choix Incorect! le nombre d'allumettes a enlever est plus grand que le nombre d'allumettes restant!";
    }
    else{
        document.getElementById('print').innerHTML = "Choix Incorect! Entrez un nombre entre 1 et 3!";
    }
}

function joueur(choixJoueur, allumettes) {
    'use strict';
    var nbAllRest = allumettes.length;

    if (nbAllRest > 3) {
        enleverAll(choixJoueur, allumettes);
        document.getElementById('joueur').innerHTML = choixJoueur;
        if(choixJoueur > nbAllRest || choixJoueur <= 0 || choixJoueur > 3 || isNaN(choixJoueur)) {
            return 0;
        }
    }
    else if (nbAllRest === 3 || nbAllRest === 2) {
        enleverAll(choixJoueur, allumettes);
        document.getElementById('joueur').innerHTML = choixJoueur;
        if ((choixJoueur === 3 && allumettes.length === 0) || (choixJoueur === 2 && allumettes.length === 0)) {
            document.getElementById('print').innerHTML = "Vous avez perdu, on retirent jamais les " +choixJoueur+ " dernieres allumettes. Je conner un petit chat qui est plus intelligent que vous!!!";
            document.getElementById('ordi').innerHTML = "";
            return 0;
        }
    }
    else if (nbAllRest === 1){
        enleverAll(choixJoueur, allumettes);
        document.getElementById('joueur').innerHTML = choixJoueur;
        if (allumettes.length === 0) {
            document.getElementById('print').innerHTML = "Vous avez perdu contre l'ordinateur. Je conner un petit chat qui est plus intelligent que vous!!!";
            document.getElementById('ordi').innerHTML = "";
        }
        
        return 0;
    }

    return 1;
}

function ordinateur(allumettes) {
    'use strict';
    var choixOrdinateur, ordi = document.getElementById('ordi');

    if (allumettes.length > 3) {
        choixOrdinateur = Math.floor(Math.random()*3+1);
        enleverAll(choixOrdinateur, allumettes);
        ordi.innerHTML = choixOrdinateur;
    }
    else if (allumettes.length === 3) {
        choixOrdinateur = Math.floor(Math.random()*2+1);
        enleverAll(choixOrdinateur, allumettes);
        ordi.innerHTML = choixOrdinateur;
    }
    else if (allumettes.length === 2) {
        choixOrdinateur = Math.floor(Math.random()+1);
        enleverAll(choixOrdinateur, allumettes);
        ordi.innerHTML = choixOrdinateur;
    }
    else if (allumettes.length === 1) {
        enleverAll(1, allumettes);
        ordi.innerHTML = 1;
        document.getElementById('print').innerHTML = "Vous avex gagnez contre l'ordinateur. Vous pouvais considerez changez votre nom en \"Alan Turing\"!!!";
    }
}

function jouer() {
    'use strict';
    var choixJoueur = parseInt(document.getElementById("nbAllEnlever").value, null), 
        allumettes = document.getElementsByClassName('all');

    document.getElementById('print').innerHTML = "";

    if (!joueur(choixJoueur, allumettes)) {
        return 0;
    }
    else {
        ordinateur(allumettes);
    }
}