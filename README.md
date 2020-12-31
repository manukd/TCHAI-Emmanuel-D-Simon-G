Projet final de Système d'information avancé
<h3>
 Auteurs :
</h3>
<p> 
    DEREPAS Emmanuel  : Emmanuel_Derepas@etu.u-bourgogne.fr <br/>
    GAUTHERON Simon  : sgautheron21@gmail.com<br/>
</p>

## Execution
L'éxécution nécessite un fichier de connexion qui n'est pas présent sur le GitHub
```bash
# install dependencies
$ npm install

# Exécuter la version de tchaï voulu ainsi que l'interface utilisateur accessible en localhost:3000
$ npm run runV1
$ npm run runV2
$ npm run runV3
$ npm run runV4

#Exécuter les script d'attaque pour les version de Tchaï 1, 2 et 3
$ npm run attaqueV1
$ npm run attaqueV2
$ npm run attaqueV3

Puis se connecter à localhost:8080 avec postman ou un navigateur web
```

### Attaque Tchaï V1
Lors de l'attaque de Tchaï V1, on évalue le solde d'une personne choisit dans le code. Après cela on renregistre ce dernier dans un variable.
Nous allons ensuite modifier directement dans la base de données, le montant d'une transaction de la personne choisit préalablement.
Une fois cela nous réévaluons le dolde de la personne et l'on observe que la personne a un solde différent sans que cela soit détécter.
### Attaque Tchaï V2
Lors de l'attaque de Tchaï V2, on considère 3 comptes, P1, P2 et P3. On évalue le solde de ces 3 comptes dans un tout premier temps.
Puis nous effectuons une transaction de P1 vers P2 puis une seconde transaction allant de P2 à P3.
On recalculera le soldes des trois compte afin de vérifier que les transaction ont bien été effectuées.
Enfin on supprimera de notre base de données la première transaction que nous avons effectuée.
Suite à cela, on vérifie les soldes de nos 3 comptes, on observera alors une faille causé par la méthode de calcul que l'on utilise dans le cadre de cette exercice.
On observera alors que le solde du compte de P3 aura été crédité de la seconde transaction mais que l'argent initialement débiter du compte P1, sera magiquement revenu sur son compte.
On aura donc dubliquer des crédits sans que cela soit détécté.
### Attaque Tchaï V3
Lors de l'attaque de Tchaï V3, on calculera le solde de nos 2 comptes, puis nous initiliserons une transaction en insérant comme débiteur une personne externe à notre compte.
Nous nous ajouterons comme créditeur afin de recevoir la somme que l'on souhaite. Ce processus ne sera à aucun moment repéré et permet à n'importe qui de recevoir de l'argent sans le consentement du débiteur.
