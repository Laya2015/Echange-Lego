const trligne = document.querySelectorAll("#id_ligne");

function lienEchange(){
    trligne.forEach(ligne => {
            const detailsEchangetext = ligne.querySelector("#detailsEchange");
            const idEchange = detailsEchangetext.getAttribute('data-id');
            const lienVoirEchange = ligne.querySelector('#lienVoirEchange');
            const monHref = lienVoirEchange.getAttribute('href');
            lienVoirEchange.href = addParamUrl(monHref,idEchange);
    });
}
function addParamUrl(monHref,idEchange){
    return monHref+=`?id_echange=${idEchange}`
}

lienEchange();
