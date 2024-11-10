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


const buttonDelete = document.querySelectorAll("#delete");

    buttonDelete.forEach(boutton =>{
        // const id_echange = boutton.getAttribute('data_id');
        boutton.addEventListener('click', async (event) => {
            event.preventDefault();
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
                // alert('Ligne supprimer');
            }else {
                alert('echec de la suppression')
            }
            
        });
    })
// })
lienEchange();