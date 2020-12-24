const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Transaction = require('./schema')
const Utilisateur = require('./schemaUser')
const connexion = require('../connexion')
const crypto = require('crypto')
const cors = require('cors')

mongoose.connect('mongodb+srv://'+ connexion.user + ':' + connexion.password + '@tchai.yc5xa.mongodb.net/TransactionV4', {useNewUrlParser: true, useUnifiedTopology: true})


let app = express()
let port = 8080

var jsonParser = bodyParser.json()

app.use(jsonParser)
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello les AMIZ !')
})

app.listen(port, () => {
    console.log('Fonctionne au poil')
})

app.post('/login', async (req, res) => {
    const hash = crypto.createHash('sha256')
    const hash_update = hash.update((req.body.mdp),'utf8')
    const hash_res = hash_update.digest('hex')
    let tmp1 = await Utilisateur.findOne({ identifiant: req.body.identifiant,  mdp: hash_res})
    if (tmp1) {
        resultat = true
    } else {
        resultat = false
    }
    res.send({utilisateur: tmp1, resultat: resultat})
})

app.post('/inscription', async (req, res) => {
    const hash = crypto.createHash('sha256')
    const hash_update = hash.update((req.body.mdp),'utf8')
    const hash_res = hash_update.digest('hex')

    const mdp = hash_res

    const hash1 = crypto.createHash('sha256')
    const hash_update1 = hash1.update((req.body.nom + req.body.prenom + req.body.identifiant + req.body.email + req.body.mdp),'utf8')
    const hash_res1 = hash_update1.digest('hex')

    const adresse = hash_res1

    const nouvelUtilisatuer = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        identifiant:req.body.identifiant,
        mdp: mdp,
        email: req.body.email,
        adresse: adresse
    })

    await nouvelUtilisatuer.save()
    res.json(nouvelUtilisatuer)
})

