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

const buttonDelete = document.querySelectorAll("#delete");
buttonDelete.forEach(boutton =>{
    boutton.addEventListener('click', async () => {
        // event.preventDefault();
        const idEchange = boutton.getAttribute("data-id");
        const data = {
            id_echange: idEchange
        }

        const response = await fetch('/api/userEchanges', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if(response.ok){
            const tdToDelete = boutton.closest('tr');
            tdToDelete.remove();
        }else {
            alert('echec de la suppression')
        } 
    });
})

lienEchange();