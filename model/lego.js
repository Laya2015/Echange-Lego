import { connexion } from '../db/connexion.js';


/**
 * Fonction qui utilise les tables echange et utilisateur
 * @returns les echanges proposés par l'utilisateur ainsi que leurs nom et prenom
 */
//Valider
export async function getAllEchanges() {
    const echanges = await connexion.all(
        `SELECT echange.nom_echange, utilisateur.nom, utilisateur.prenom, utilisateur.id_utilisateur, echange.id_echange
        FROM echange
        JOIN utilisateur ON echange.id_utilisateur = utilisateur.id_utilisateur;`
    )
    return echanges;
}

/**
 * Fonction qui utilise les tables echange et utilisateur
 * @returns les echanges proposés par un utilisateur précis ainsi que son nom et prenom
 */
export async function getUserEchanges() {
    const userEchanges = await connexion.all(
        `SELECT echange.nom_echange, utilisateur.nom, utilisateur.prenom, echange.id_echange
        FROM echange
        JOIN utilisateur ON echange.id_utilisateur = utilisateur.id_utilisateur;`
    )
    return userEchanges;
}

/**
 * Fonction pour obtenir les details sur les briques a partir des deux tables brique et couleur
 * @returns un tableau de briques
 */
export async function getBrique() {
    const briques = await connexion.all(

        `SELECT brique.image , couleur.nom as brique_Couleur , brique.valeur , brique.nom , brique.id_brique
        FROM brique
        JOIN couleur ON brique.id_couleur = couleur.id_couleur;`
    )
    return briques;
}

/**
 * Fonction d'ajout un echange 
 * @param {*} nom_echange Nom de l'echange
 * @param {*} id_briques Tableau de id_brique
 * @param {*} quantites Tableau des quantites saisies
 * @returns id_echange du dernier echange ajouté
 */
export async function postEchange(nom_echange, id_briques, quantites) {
    const resultat = await connexion.run(
        `INSERT INTO echange (nom_echange, id_utilisateur)
        VALUES (?, ?);`,
        [nom_echange, 1]
    );


    for (let i = 0; i < id_briques.length; i++) {
        const resultat2 = await connexion.run(
            `INSERT INTO echange_brique (id_echange, id_brique, quantite)
            VALUES (?, ?, ?)`,
            [resultat.lastID, id_briques[i], quantites[i]]
        );
    }
    return resultat.lastID;
}

/**
 * Fonction de suppression d'un echange dans les deux tables echange et brique_echange
 * @param {*} id_echange id_echnage de l'echange en question
 */
export async function deleteEchange(id_echange) {
    const deleteEchange = await connexion.run(`
        DELETE FROM echange 
        WHERE id_echange = ?`,
        [id_echange]
    )
    const deleteEchangeBrique = await connexion.run(`
        DELETE FROM echange_brique 
        WHERE id_echange = ?`,
        [id_echange]
    )
}

/**
 * Fonction qui affiche les details d'un echange
 * @param {*} id_echange 
 * @returns un tableau
 */
export async function getDetailsEchanges(id_echange) {
    const allDetailsEchange = await connexion.all(
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
