const trligne = document.querySelectorAll("#id_ligne");

function addTodoClient(){
let somme =0;
trligne.forEach(ligne => {
    const quantite = ligne.querySelector("#id_quantite").textContent;
    const valeur = ligne.querySelector('#id_valeur').textContent;
    const resultat = ligne.querySelector("#id_resultat");
    let multiplication = (quantite*valeur)
    resultat.textContent = multiplication.toFixed(2) + "$" ;
    somme += multiplication;
    });

const totalValeurEchange = document.querySelector("#totalValeurEchange");
totalValeurEchange.textContent += somme.toFixed(2) + "$";
}
addTodoClient();