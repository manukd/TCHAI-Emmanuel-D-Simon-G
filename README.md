Projet final de Système d'information avancé
<h3>
 Auteurs :
</h3>
<p> 
    DEREPAS Emmanuel  : Emmanuel_Derepas@etu.u-bourgogne.fr <br/>
    GAUTHERON Simon  : sgautheron21@gmail.com<br/>
</p>

## Architectures
    .
    ├── src                   # Dossier contenant les sources de notre API pour chacune des versions
    │   ├── TchaiV1           # Version 1 de notre API
    │   ├── TchaiV2           # Version 2 de notre API
    │   ├── TchaiV3           # Version 3 de notre API
    │   ├── TchaiV4           # Version 4 de notre API
    │   ├── [- #Placer le fichier de connexion ici# -]
    │   └── index.js
    ├── test                  # Dossier des attaques des versions V1, V2 et V3
    │   ├── attaqueTchaiV1    # Attaque de la version 1 de notre API
    │   ├── attaqueTchaiV2    # Attaque de la version 2 de notre API
    │   └── attaqueTchaiV3    # Attaque de la version 3 de notre API
    ├── UI                    # Dossier contenant le framwork de developpement Front-end NuxtJS
    │   ├──assets             # Dossier des assets de l'application
    │   ├──components         # Dossier des composants de l'application
    │   ├──static             # Dossier des éléments statiques de notre application
    │   ├──store              # Dossier contenant les différents stores que nous utiliserons dans notre application
    │   ├──pages              # Dossier contenant les pages de notre application et servant de router
    │   ├──plugins            # Dossier composer des plugins que nous utiliserons (Aucun dans notre cas)
    │   ├──layouts            # Dossier contenant les layouts de notre application
    │   ├──middleware         # Dossier contenant les middleware de notre application
    │   ├──nuxt.config.js     # Fichier de configuration de notre framework NuxtJS
    │   ├──package.json       # Dépendances de l'application Front-end
    │   ├──README.md
    ├── package.json          # Dépendances d'ExpressJS
    └── README.md

## Dépendances
### Dépendances Back-end
```bash
"dependencies": {
    "body-parser": "^1.19.0", # -> Permet de gérer les resultats et paramètres des appelles de fonction API
    "concurrently": "^5.3.0", # -> Permet de créer des scripts de lancement avec plusieurs commandes (runV1, attaqueV1, ...)
    "cors": "^2.8.5", # -> Permet de gérer les conflit CORS entre le back et le front end en local
    "express": "^4.17.1", # -> Framework principal pour créer les APIs
    "mongoose": "^5.10.9", # -> Permet de se connecter et gérer une base de données MongoDB
    "request": "^2.88.2" # -> Permet de créer un requête directement depuis notre back-end
  },
```
### Dépendances Front-end
```bash
"dependencies": {
    "@nuxtjs/axios": "^5.12.4", # -> Module axios de NuxtJS permettant d'effectuer des requêtes depuis notre Front-end
    "@nuxtjs/toast": "^3.3.1", # -> Module NuxtJS permettant d'afficher des notifications de type "toast"
    "core-js": "^3.6.5", # -> Permet 
    "nuxt": "^2.14.6" # -> Le meilleur Framework de developpement Front-end 
  },
  "devDependencies": {
    "@nuxtjs/vuetify": "^1.11.2" # -> Module NuxtJS permettant d'importer des composants VueJS
  }
```
## Fonctionnalités
### Inscription
Une fois sur la page d'accueil il est possible de s'inscrire. Il faudra alors renseigner plusieurs informations puis valider. Si l'insciption s'est correctement terminée, une notification sera émise.
### Connexion
Il est aussi possible de se connecter par l'intermédiaire de la page de connexion où il sera nécessaire de renseigner l'identifiant et le mot de passe déclaré lors de l'inscription
### Ajouter une transaction
En ce qui concerne l'ajout d'une transaction il sera demandé à l'utilisateur de renseigner le débiteur et le créditeur ainsi que la somme à transferer. Si la transaction s'est correctement terminée, une notification vous le ferra savoir.
### Voir les transactions
Il sera possible de voir l'ensemble des transaction effectuer grâce au deuxième onglet proposé.
### Voir les transaction d'une personne
Si l'on souhaite être plus précis, il sera possible dans le troisième onglet de rechercher toutes les transactions ayant pour créditeur ou débiteur la personne spécifiée dans la barre de recherche.
### Voir le solde d'un compte
Dans le dernier onglet il vous sera possible de spécifier une personne et calculer le solde de cette dernière.
Il sera aussi possible de voir à tout moment de la navigation le solde du compte connecté.
### Effectuer une vérification de la base de données des transactions
Il vous sera possible à tout moment de votre navigation, de lancer une vérification de la base de transaction afin de savoir si des erreurs ont été repérées.

## Execution
L'éxécution nécessite un fichier de connexion qui n'est pas présent sur le GitHub
```bash
# Installer les dépendances dans le dossier principale
$ npm install

# Installer les dépendances dans le dossier Interface Utilisateur
$ cd UI
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
```
## Connexion
### Connexion runVx
Se connecter à localhost:3000
### Connexion aux attaques Vx
Se connecter à localhost:8080
## Tests
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
