import {connexion} from '../db/connexion.js';


/**
 * 
 * @returns les echanges proposé par l'utilisateur
 */
//Valider
export async function getAllEchanges() {
    const echanges = await connexion.all(
        //`SELECT * FROM echange`
        `SELECT echange.nom_echange, utilisateur.nom, utilisateur.prenom, utilisateur.id_utilisateur, echange.id_echange
        FROM echange
        JOIN utilisateur ON echange.id_utilisateur = utilisateur.id_utilisateur;`
        )
    return echanges;
}

//non valider
export async function getUserEchanges() {
    const userEchanges = await connexion.all(
        //`SELECT * FROM echange`
        `SELECT echange.nom_echange, utilisateur.nom, utilisateur.prenom
        FROM echange
        JOIN utilisateur ON echange.id_utilisateur = utilisateur.id_utilisateur;`
        )
    return userEchanges;
}

//Valider
export async function getBrique() {
    const briques = await connexion.all(
        // `SELECT *
        // FROM brique`
        `SELECT brique.image , couleur.nom as brique_Couleur , brique.valeur , brique.nom 
        FROM brique
        JOIN couleur ON brique.id_couleur = couleur.id_couleur;`
    )
    return briques;
}

//Valider
export async function postEchange(nom_echange, briques){
    const resultat = await connexion.run(
        `INSERT INTO echange (nom_echange, id_utilisateur)
        VALUES (?, ?);`,
        [nom_echange, 1]
        // INSERT INTO echange_brique(id_brique, quantite)
    );
    const idStock = resultat.lastID;

    for(const brique of briques) {
        const resultat2 = await connexion.run(
            `INSERT INTO echange_brique (id_echange, id_brique, quantite)
            VALUES (?, ?, ?)`,
            [idStock, brique.id_brique, brique.quantite]
            
            // INSERT INTO echange_brique(id_brique, quantite)
        );
        return resultat2.lastID;
    }
}

//Valider
export async function getEchangeBrique() {
    const echangebriques = await connexion.all(
        `SELECT * 
        FROM echange_brique
        JOIN echange ON echange.id_echange = echange_brique.id_echange;`
    )
    return echangebriques;
}

//non valider
export async function deleteEchange(echangeId) {
    await connexion.run(`
        DELETE FROM echange 
        WHERE id_echange = ? AND id_utilisateur = ?`,
        [echangeId, 1]
    )
}

export async function getDetailsEchanges(id_echange) {
    const allDetailsEchange = await connexion.all(
        //`SELECT * FROM echange`
        `SELECT echange.nom_echange as nom_echange, utilisateur.nom, utilisateur.prenom , brique.nom as nom_brique, brique.image, brique.valeur, couleur.nom as couleur_brique , echange_brique.quantite
        FROM echange
        JOIN utilisateur ON echange.id_utilisateur = utilisateur.id_utilisateur
        JOIN echange_brique ON echange_brique.id_echange = echange.id_echange
        JOIN brique ON echange_brique.id_brique = brique.id_brique
        JOIN couleur ON couleur.id_couleur = brique.id_couleur
        WHERE echange.id_echange = ${id_echange} AND echange_brique.id_echange = ${id_echange} ;
        `
    )

    return allDetailsEchange;
        
        
   
}