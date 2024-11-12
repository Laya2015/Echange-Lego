import 'dotenv/config';

import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { engine } from 'express-handlebars';
import { deleteEchange, getAllEchanges, getBrique, getUserEchanges, postEchange, getDetailsEchanges } from './model/lego.js';


// Créer le serveur
const app = express();

//Ajout des engins
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Ajout de middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(express.static('public'))

//programmation des routes

app.get('/echanges', async (request, response) => {
    const allEchanges = await getAllEchanges();
    response.render('echanges', {
        titre: 'Echanges',
        styles: ['/css/echanges.css'],
        scripts: ['/js/echanges.js'],
        allEchanges: allEchanges
    })
})
app.get('/api/echanges', async (request, response) => {
    const echanges = await getAllEchanges();
    response.status(200).json(echanges);
})
app.get('/userEchanges', async (request, response) => {
    const userEchanges = await getUserEchanges();
    response.render('mes_echanges', {
        titre: 'Mes Echanges',
        styles: ['/css/mes_echanges.css'],
        scripts: ['/js/mes_echanges.js'],
        userEchanges: userEchanges
    })
});
app.get('/api/userEchanges', async (request, response) => {
    const mesEchanges = await getUserEchanges();
    response.status(200).json(mesEchanges);
})

app.get('/briques', async (request, response) => {
    const allBrique = await getBrique();
    response.render('creer_echange', {
        titre: 'Creer Echange',
        styles: ['/css/creerEchange.css'],
        scripts: ['/js/briques.js'],
        allBrique: allBrique
    })
})
app.get('/api/briques', async (request, response) => {
    const briques = await getBrique();
    response.status(200).json(briques);
})

app.get("/DetailsEchange", async (request, response) => {
    const allDetailsEchange = await getDetailsEchanges(request.query.id_echange);
    response.render('affiche_echange', {
        titre: 'Details',
        styles: ['/css/afficheEchange.css'],
        scripts: ['/js/affiche_echange.js'],
        allDetailsEchange: allDetailsEchange,
        var: allDetailsEchange[1]
    })
})
app.get("/api/DetailsEchanges", async (request, response) => {
    const allDetailsEchange = await getDetailsEchanges(request.query.id_echange);
    response.status(200).json(allDetailsEchange);
})

app.delete('/userEchanges', async (request, response) => {
    const supprime_change = await deleteEchange(request.query.id_echange);
    response.render('mes_echanges', {
        titre: 'Mes Echanges',
        styles: ['/css/mes_echanges.css'],
        scripts: ['/js/mes_echanges.js']
    });
})
app.delete('/api/userEchanges', async (request, response) => {
    const supprime_change = await deleteEchange(request.body.id_echange);
    response.status(200).json(supprime_change);
})

app.post('/api/echange', async (request, response) => {
    const index = await postEchange(request.body.nom_echange, request.body.id_briques, request.body.quantites);
    response.status(201).json({ id_echange: index })
})

// Démarrer le serveur
console.log('Serveur démarré:');
console.log('http://localhost:' + process.env.PORT + "/briques");
app.listen(process.env.PORT);


// mettre des commentaires sur les fonction
//commetaire sur les routes par pair
//indentation
//h1 > h2 >h3
//validations
//nettoyer le code nom utilise