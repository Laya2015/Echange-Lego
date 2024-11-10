const trligne = document.querySelectorAll("#id_ligne");
console.log(trligne);

function lienEchange(){
    trligne.forEach(ligne => {
            const detailsEchangetext = ligne.querySelector("#detailsEchange");
            console.log(detailsEchangetext.getAttribute('data-id'));
            const idEchange = detailsEchangetext.getAttribute('data-id');
            const lienVoirEchange = ligne.querySelector('#lienVoirEchange');
            const monHref = lienVoirEchange.getAttribute('href');
            console.log(monHref);
            console.log(addParamUrl(monHref,idEchange));
            lienVoirEchange.href = addParamUrl(monHref,idEchange);
            console.log(lienVoirEchange.getAttribute('href'));
    });
}
function addParamUrl(monHref,idEchange){
    return monHref+=`?id_echange=${idEchange}`
}

lienEchange();
