// Charger les configurations du projet
import 'dotenv/config';

import express, { json, request, response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import {engine} from 'express-handlebars';
import { deleteEchange, getAllEchanges, getBrique, getEchangeBrique, getUserEchanges, postEchange } from './model/lego.js';


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
app.get('/allEchanges', async (request, response) => {
    const allEchanges = await getAllEchanges();
    response.render('echanges', {
        titre: 'Echanges',
        styles: ['/css/echanges.css'],
        //scripts: ['/js/echanges.js'],
        allEchanges : allEchanges
    })
});

//creer echange
app.get('/briques', async (request,response) => {
    const allBrique = await getBrique();
    response.render('creer_echange',{
        titre : 'Creer Echange',
        styles : ['/css/creerEchange.css'],
        allBrique : allBrique
    })
})

//creation des echanges 
app.get('/echanges', async (request,response) => {
    const allEchanges = await getAllEchanges();
    response.render('echanges',{
        titre : 'Echanges',
        styles : ['/css/echanges.css'],
        allEchanges : allEchanges
    })
})

app.get('/api/echanges', async (request,response) => {
    const  echanges = await getAllEchanges();
    response.status(200).json(echanges);
})

//ROUTE brique
app.get('/api/briques',async (request,response)=>{
    const briques = await getBrique();
    response.status(200).json(briques);
})
app.post('/api/echange', async (request, response) => {
    const index = await postEchange(request.body.nom_echange);
    response.status(201).json({id_echange : index})
})

app.get('/api/echangeBriques',async (request,response)=>{
    const echangeBriques = await getEchangeBrique();
    response.status(200).json(echangeBriques);
})

app.delete('/api/supprimeEchange',async (request,response)=>{
    const supprime_change = await deleteEchange();
    response.status(200).json(supprime_change);
})

// Démarrer le serveur
console.log('Serveur démarré:');
console.log('http://localhost:' + process.env.PORT);
app.listen(process.env.PORT);