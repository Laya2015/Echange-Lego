// const btnVoirEchange = document.querySelectorAll("input");
const notreTable = document.querySelector("table");
// const tdquantite = document.querySelectorAll("#id_quantite");
// const tdvaleur = document.querySelectorAll("#id_valeur");
const trligne = document.querySelectorAll("#id_ligne");

// console.log(tdquantite.innerText);
// console.log(tdvaleur.innerText);
// document.querySelectorAll('#id_ligne').forEach(element => {
//     // Ton code ici pour chaque élément
//     console.log(element);
//   });
let somme =0;

trligne.forEach(ligne => {
    const quantite = ligne.querySelector("#id_quantite").textContent;
    console.log(quantite);
    const valeur = ligne.querySelector('#id_valeur').textContent;
    console.log(valeur);
    console.log(quantite*valeur);
     const resultat = ligne.querySelector("#id_resultat");
     let multiplication = (quantite*valeur)
     resultat.textContent = multiplication.toFixed(2) + "$" ;

     somme+=multiplication;
     

});
const totalValeurEchange = document.querySelector("#totalValeurEchange");
totalValeurEchange.textContent += somme.toFixed(2) + "$";


// addTodoClient();