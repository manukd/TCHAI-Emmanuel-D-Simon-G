const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Transaction = require('./schema')
const Utilisateur = require('./schemaUser')
const connexion = require('../connexion')
const crypto = require('crypto')
const hash = crypto.createHash('sha256')
const cors = require('cors')

mongoose.connect('mongodb+srv://'+ connexion.user + ':' + connexion.password + '@tchai.yc5xa.mongodb.net/TransactionV1', {useNewUrlParser: true, useUnifiedTopology: true})


let app = express()
let port = 8080

const url = bodyParser.urlencoded({ extended: true })
const jsonParser = bodyParser.json()

app.use(url)
app.use(jsonParser)
app.use(cors())

const connexionS = app.get('/', (req, res) => {
    res.send('Hello les AMIZ !')
})

app.listen(port, () => {
    console.log('Fonctionne au poil')
})

app.post('/', jsonParser, async (req, res) => {
    const personne1 = req.body.personne1
    const personne2 = req.body.personne2
    const date = Date.now()
    const somme = req.body.somme

    if (!personne1 || !personne2 || !date || !somme) {
        res.send("Les élémentes n'ont pas été correctement reçu")
    }

    const nouvelleTransaction = new Transaction({
        personne1: personne1,
        personne2: personne2,
        date: date,
        somme: somme
    })

    await nouvelleTransaction.save()
    res.json(nouvelleTransaction)
})

app.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find()
    await res.json(transactions)
})

app.get('/transactions/:personne', async (req, res) => {
    const personne = req.params.personne
    const transaction1 = await Transaction.find({personne1: personne})
    const transaction2 = await Transaction.find({personne2: personne})
    const transaction = transaction1.concat(transaction2)
    res.json(transaction)
})

app.get('/transactions/solde/:personne', async (req, res) => {
    const personne = req.params.personne
    let solde = 0.
    const transaction1 = await Transaction.find({personne1: personne})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    const transaction2 = await Transaction.find({personne2: personne})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }
    res.json({"personne": personne, "solde": solde})
})

app.get('/transactions/:id', async (req, res) => {
    const id = req.params.id
    const transaction = await Transaction.findOne({_id: id})
    res.json(transaction)
})

app.post('/login', async (req, res) => {
    const hash = crypto.createHash('sha256')
    const hash_update = hash.update((req.body.mdp),'utf8')
    const hash_res = hash_update.digest('hex')
    let tmp1 = await Utilisateur.findOne({ identifiant: req.body.identifiant,  mdp: hash_res })
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

    const nouvelUtilisatuer = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        identifiant:req.body.identifiant,
        mdp: mdp,
        email: req.body.email
    })

    await nouvelUtilisatuer.save().catch(err => err)
    res.json(err)
})


module.exports = {connexionS}
