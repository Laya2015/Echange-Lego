
const quantiteBrique = document.querySelectorAll('#quantiteBrique');
const messageErreur = document.querySelector('#messageErreur');


function caseVide() {
    let total = 0;
    quantiteBrique.forEach(element => {
        if (element.value == '0') total = total + 1

    });

    if (total == 24) return 0;
    else return 1;
}


document.querySelector('.btnCreerEchange').addEventListener('click', (event) => {
    // event.preventDefault();
    const val = caseVide();
    if (val == 0) messageErreur.innerText = "veuillez saisir le nombre de briques.";
    else {
        messageErreur.innerText = "";
        for (let i = 0; i < quantiteBrique.length; i++) {

        }
        // let table2D  =[][] ;
        window.location.href = ("http://localhost:5000/echanges")
        //** */
    }


})