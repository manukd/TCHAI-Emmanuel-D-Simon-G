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

const url = bodyParser.urlencoded({ extended: true })
const jsonParser = bodyParser.json()

app.use(url)
app.use(jsonParser)
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello les AMIZ !")
})

app.listen(port, () => {
    console.log("Fonctionne au poil")
})

app.post('/', jsonParser, async (req, res) => {

    let tmp1 = await Utilisateur.findOne({ _id: req.body.id})
    if (tmp1) {
        resultat = true
    } else {
        resultat = false
    }
    if (resultat) {
        const personne1 = req.body.personne1
        const personne2 = req.body.personne2
        const date = Date.now()
        const somme = req.body.somme
        ////////////////////////////////////////////////
        let tmp = await Transaction.findOne({}, {}, { sort: { 'date' : -1 } })
        let last_transac = JSON.parse(JSON.stringify(tmp)).hash1
        ////////////////////////////////////////////////
        const sign = crypto.createSign('sha256')
        const sign_update = sign.update((personne1+personne2+date+somme+last_transac),'utf8')
        sign_update.end()
        const signature = sign.sign(tmp1.clePrivee)

        if (!personne1 || !personne2 || !date || !somme || !hash_res || !last_transac) {
            res.send("Les élémentes n'ont pas été correctement reçu")
        }

        const nouvelleTransaction = new Transaction({
            personne1: personne1,
            personne2: personne2,
            date: date,
            somme: somme,
            hash1: hash_res
        })

        await nouvelleTransaction.save()
    }
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

    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 515,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem"}
    })

    const adresse = publicKey

    const nouvelUtilisatuer = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        identifiant:req.body.identifiant,
        mdp: mdp,
        email: req.body.email,
        adresse: adresse,
        clePrivee: privateKey
    })

    await nouvelUtilisatuer.save()
    res.json(nouvelUtilisatuer)
})

app.post('/', jsonParser, async (req, res) => {
    const personne1 = req.query.personne1
    const personne2 = req.query.personne2
    const date = Date.now()
    const somme = req.query.somme
    ////////////////////////////////////////////////
    let tmp = await Transaction.findOne({}, {}, { sort: { 'date' : -1 } })
    let last_transac = JSON.parse(JSON.stringify(tmp)).hash1
    ////////////////////////////////////////////////
    const hash_update = hash.update((personne1+personne2+date+somme+last_transac),'utf8')
    const hash_res = hash_update.digest('hex')

    if (!personne1 || !personne2 || !date || !somme || !hash_res || !last_transac) {
        res.send("Les élémentes n'ont pas été correctement reçu")
    }

    const nouvelleTransaction = new Transaction({
        personne1: personne1,
        personne2: personne2,
        date: date,
        somme: somme,
        hash1: hash_res
    })

    await nouvelleTransaction.save()
    res.json(nouvelleTransaction)
})