const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Transaction = require('./schema')
const Utilisateur = require('./schemaUser')
const connexion = require('../connexion')
const crypto = require('crypto')
const hash = crypto.createHash('sha256')
const cors = require('cors')

mongoose.connect('mongodb+srv://'+ connexion.user + ':' + connexion.password + '@tchai.yc5xa.mongodb.net/TransactionV3', {useNewUrlParser: true, useUnifiedTopology: true})


let app = express()
let port = 8080

const url = bodyParser.urlencoded({ extended: true })
const jsonParser = bodyParser.json()

app.use(url)
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

app.post('/', jsonParser, async (req, res) => {
    const personne1 = req.body.personne1
    const personne2 = req.body.personne2
    const date = Date.now()
    const somme = req.body.somme
    let collectionEmpty = false
    let tmp = ""
    let last_transac = ""
    let hash_update = ""
    let hash_res = ""
    await Transaction.count({}, function (err, count) {
        if (count === 0) {
            collectionEmpty = true
        }
    })
    if (collectionEmpty) {
        hash_update = hash.update((personne1+personne2+date+somme+last_transac),'utf8')
        hash_res = hash_update.digest('hex')
    } else {
        tmp = await Transaction.findOne({}, {}, { sort: { 'date' : -1 } })
        last_transac = JSON.parse(JSON.stringify(tmp)).hash1

        hash_update = hash.update((personne1+personne2+date+somme+last_transac),'utf8')
        hash_res = hash_update.digest('hex')
    }


    if (!personne1 || !personne2 || !date || !somme || !hash_res) {
        if (collectionEmpty) {
            if (!last_transac) {
                res.send("Les élémentes n'ont pas été correctement reçu")
            }
        }
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
app.get('/transactions/verification', async (req, res) => {
    const transactions = await Transaction.find()
    let temp = JSON.parse(JSON.stringify(transactions))
    let transactionsNonConforme = []
    let erroner = false
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            const personne1 = temp[prop].personne1
            const personne2 = temp[prop].personne2
            const date = Date.parse(temp[prop].date)
            const somme = temp[prop].somme
            ////////////////////////////////////////////////
            let tmp = await Transaction.findOne({}, {}, { sort: { 'date' : -1 } })
            let last_transac = JSON.parse(JSON.stringify(tmp)).hash1
            ////////////////////////////////////////////////
            const hash_update = hash.update((personne1+personne2+date+somme+last_transac),'utf8')
            const hash_res = hash_update.digest('hex')
            if (hash_res !== temp[prop].hash1) {
                transactionsNonConforme.push(temp[prop])
                erroner = true
            }
        }
    }
    if (erroner) {
        res.json(transactionsNonConforme)
    } else {
        res.send("La vérification des transactions s'est terminé sans trouver d'erreur")
    }
})

