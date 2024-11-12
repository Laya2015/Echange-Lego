
const quantiteBrique = document.querySelectorAll('#quantiteBrique');
const messageErreur = document.querySelector('#messageErreur');
const txtNomEchange = document.querySelector('#nomEchange');

let id_briques = [];
let quantites = [];
function caseVide() {
    let total = 0;
    quantiteBrique.forEach(element => {
        if (element.value == '0') total = total + 1
        else {
            quantites.push(element.value);
            id_briques.push(element.getAttribute('data-id'))
        }
    });
    console.log(id_briques);
    console.log(quantites);
    if (total == 24) return 0;
    else return 1;
}

function viderquantiteBrique() {
    quantiteBrique.forEach(element => {
        element.value = "0";
    })
    txtNomEchange.value = "";
}

document.querySelector('.btnCreerEchange').addEventListener('click', async () => {
    // event.preventDefault();
    const val = caseVide();
    if (val == 0) messageErreur.innerText = "veuillez saisir le nombre de briques.";
    else {
        messageErreur.innerText = "";
        const data = {
            nom_echange: txtNomEchange.value,
            id_briques: id_briques,
            quantites: quantites
        }
        const response = await fetch('/api/echange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            viderquantiteBrique();
            window.location.href("http://localhost:5000/userEchanges");
        }
    }
})