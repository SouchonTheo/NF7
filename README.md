# NF7

# Introduction :

## Définitions :

- **Mint :**
  - Mint est un terme qui signifie "écrire dans la blockchain". </br>Cela se fait à l'aide d'un contrat que l'on appelle via une adresse qui lui est propre avec la bibliothèque ethers </br> Le terme mint est un mot utilisé pour tout ce qui touche a la blockchain et non uniquement au NFT.
- **Contrat :**
  - Un contrat c'est quoi ?
    - Un contrat, c'est un fichier écrit en solidity qui peut être envoyée dans la blockchain. Ce code et ses fonctions sont utilisables par n'importe qui dans le monde.
  - Les contrats peuvent faire plusieurs choses.</br> Ils peuvent appeler des services comme Metamask pour communiquer sur les taxes de minnages ou servir à mint des NFTs ou même de la cryptomonnaie. 
  - Ce contrat est accessible via différents langages comme javascript, python, java et autre possédant une bibliothèque web3 ou ethers.
- **Blockchain :** 
  - [Lien définition](https://blockchainfrance.net/decouvrir-la-blockchain/c-est-quoi-la-blockchain/)
  - Ici, notre projet se passe sur la blockchain de test Rinkeby, mais il suffirait de changer le lien et nous pourrions miner sur une blockchain officielle comme celle de Moonbeam ou encore d'Ethereum.
- **EIP :**
  - [Lien définition](https://ethereum.org/fr/eips/)
  - Ici, pour notre NFT, nous nous basons sur l'[EIP 721](https://eips.ethereum.org/EIPS/eip-721), ce qui fait que nous sommes un site qui mint des NFTs de manière correct et que n'importe qui peut récupérer nos NFT à travers la blockchain.
</br>Si justement, nous ne respectons pas cette règle, il serait bien plus difficile pour une personne externe de pouvoir accéder a nos NFTs ce qui leur feraient perdre de la "valeur".
- [Les définitions plus techniques sont présentes dans cette section.](#tu)

Maintenant, que nous avons défini les termes liés au monde la crypto nous allons parler de ce que fait notre site NF7. Notre application a pour objectif d'être un petit réseau social de NFT. C'est-à-dire que nous pouvons consulter les NFTs mint par les autres utilisateurs et consulter nos NFTs personnels. 

## Cas d'utilisation : 

Diego jeune étudiant à l'ENSEEIHT, est passionné par les NFTs. Il souhaite en posséder une, mais ne trouve pas celle qui lui correspond sur les sites qui les répertorient toutes.

Il apprend qu'un site dédié à ça existe : NF7.

Il va donc sur notre site et se crée un compte. Sur cette page de création de compte, il doit fournir son adresse Metamask qui est une wallet (porte monnaie numérique) plutôt connue dans le monde de la crypto.

Après s'être créer un compte sur Metamask et l'avoir lié à NF7, il peut dès à présent choisir l'image qu'il souhaite inscrire dans la blockchain et qui par implication lui appartiendra, car l'adresse de cette NFT sera unique.

Après avoir fait son choix et avoir cliqué sur Mint un Pop-up de Metamask apparaîtra depuis son navigateur lui expliquant qu'il devra payer un "gas fee". Ce gas fee est un peu la taxe dédié au mineur pour pouvoir inscrire cette NFT dans la blockchain sans créer de problème.

Ceci étant fait, il peut dès à présent consulter sa NFT dans sa galerie, et même l'observer dans la galerie générale de notre site. Elle est aussi disponible sur tous les sites de crypto (openSea, etherscan, ...)

### Détails de ce qu'il s'est passé en interne de l'application :

Quand Diego à voulu se créer un compte le Frontend (React) a demandé au Backend (Node) si cet utilisateur n'existe pas déjà. S'il n'y a pas de conflit, l'utilisateur est créé et le compte est mémorisé dans la base de donnée.

Quand Diego a commencé le process de mint une NFT, son image est envoyé à [pinata](https://www.pinata.cloud/), un service IPFS permettant de créer l'URL unique de l'image. Ensuite les metadata et l'image sont de nouveau hashé pour ne posséder qu'une seul URL.

Cet URL sera utilisée pour la fonction claimItem présente dans le contrat pour pouvoir justement mint cette NFT. Avant de commencer ce process, notre algorithme demande tout de même si l'utilisateur est d'accord de payer la taxe via Metamask, un service extérieur. Ceci étant accepté par Diego la fonction claimItem se met en marche et mint cette NFT (URL) dans la blockchain.

Quand ce process est fini et validé on envoie toutes les données dans le Backend qui gère la propagation des données dans la base de données.

À présent, la galerie personnelle de Diego et la galerie publique posséderont cette nouvelle NFT.

# Sommaire
1. [Technologies utilisées](#tu)
2. [Fonctionnement de l'application](#fa)
3. [Gestion du compte utilisateur](#gcu)
4. [Galerie personnelle et publique](#gpp)
5. [Base de donnée Mongo](#bdm)
6. [Échange entre les différents conteneur de notre application](#edca)
7. [Mint d'une NFT](#nft)
8. [Lancer le docker de la bonne manière](#dock)
9. [Logiciels à installer](#li)


## <div id="tu">Technologies utilisées :</div>
- **NodeJS**
  - Ici, Node est un des éléments clé dans l'acquisition de données des Blockchain. Dû au manque de temps nous n'avons pu exploiter toute les possibilités. Par exemple il est possible de se connecter a différents noeuds dans les blockchains et de récuperer tous les contrats de transaction ou encore les NFTs presentes dans le noeud !
- **ReactJS**
  - React, nous a permis d'ajouter de la dynamique dans notre site. Il y a aussi la particularité d'avoir des packages comme ethers ou axios aussi present sur Node.
- IPFS : 
  - [Lien vers la définition précise de IPFS](https://ipfs.io/#how)
- **Docker**
  - Docker nous permet d'avoir un environnement d'execution possédant une haute compatibilité en ignorant OS ou versions des softwares.
- **Ethers Library**
  - Cette library est le moteur de notre application ! Sans elle impossible de recuperer notre contrat dans la blockchain ou encore de récuperer le code de solidity pour utiliser des fonctions liés à notre contrat.
- **Metamask**
  - Metamask est une wallet de cryptomonnaie. L'un des leader de son secteur !
- **Mongo DB**
  - Base de données répandue dans le developpement web actuel. Comparé au base de donnée classique SQL, elle a des performance plus élévé sur presque tout les fronts !
- **Bcrypt**
  - Ici nous avons utilisé Bcrypt pour encrypter les données sensibles dans notre base de donnée. Ici nous pouvons prendre pour exemple le mot de passe.
- **Tokens & Cookies**
  - Tokens : 
    - Les tokens sont présents dans le backend mais pas utilisés pour des raisons de simplifications. Cela est utile pour augmenter la securité de notre site et permet de garantir que les requêtes soient bien faites par un utilisateur réel.
  - Cookies : 
    - Non implémentés au final.
- **Axios**
  - Axios est notre lien entre le backend et le frontend. Il nous permet d'envoyer tout type de requêtes http existante. Par exemple, quand l'on souhaite mint une NFT. Le frontend envoie les données IPFS au backend pour l'ajouter dans la base de données. Un autre exemple : quand le frontend demande les nfts d'un utilisateur en particulier, il suffit d'envoyer une requête http pour avoir en réponse toutes les nfts liés à l'utilisateur.

## <div id="fa">Fonctionnement de l'application :</div>
Notre application permet de miner (mint) des NFTs et d'accéder à sa gallerie d'images. Pour cela, un utilisateur doit créer un compte en utilisant un nom d'utilisateur, un email, un mot de passe et une adresse metamask.

## <div id="gcu">Gestion du compte utilisateur :</div>
La gestion du compte utilisateur est assez classique. Un utilisateur peut créer un compte avec les informations précédemment énumérées (nom d'utilisateur, email, mot de passe, adresse metamask). Il a la possibilité de modifier les informations de son compte via la page "account". Pour cela, une confirmation du mot de passe est requise.

L'utilisateur pour aussi supprimer son compte d'une manière similaire. 

## <div id="gpp">Galerie personnelle et publique :</div> 
Notre site permet à tout utilisateur de visiter une gallerie globale dans laquelle sont visibles toutes les NFTs des utilisateurs du site. Une seconde gallerie est disponible lors de la connexion. Elle affiche les NFTs de l'utilisateur.
Le fonctionnement de ces galleries repose sur l'envoi d'une requête GET qui nous renvoie une liste d'images. Elles sont ensuite affichées dans une grille.

## <div id="bdm">Base de donnée Mongo :</div>
Nous avons décidé d'utiliser cette BD, car elle est énormément utilisée dans le monde du WEB aujourd'hui (application MERN classique) et surtout dans les applications liées aux NFTs. Cette base de données est d'ailleurs pratique, car elle nous permet d'avoir une base de données test en local à l'aide de docker et une base dans le cloud pour pouvoir simuler un pseudo-déploiement de notre application. Son efficacité supérieure au BD SQL est l'une des raisons de notre choix. Pour plus de détails, cliquez sur le lien.

[Lien vers MongoDB](https://www.mongodb.com/)

## <div id="edca">Échange entre les différents conteneur de notre application :</div>
- MongoDB :
  - La base de données Mongo peut etre alimentée et peut envoyer des données au backend.
- Backend (NodeJS) :
  - Le backend à un accés à la BD et au frontend. Il filtre bien sûr ses requêtes. Le backend peut ici seulement recevoir des requêtes venant du frontend ou de lui-même. Cela permet d'augmenter la securité et de gérer toutes les requêtes liées au frontend.
- Frontend (ReactJS) : 
  - React est en communication permanente avec le backend. Il communique aussi avec metamask qui est le gestionnaire crypto associé à notre site.

## <div id="nft">Mint d'une NFT :</div>
### <span style="color: red">Prérequis :</span>
<span style="color: red">Avoir un compte metamask et se générer de l'ethereum sur le testnet rinkeby</span>

<span style="color: blue">**Définition de TestNet** **:** Ici, nous utilisons le TestNet Rinkeby qui est une blockchain similaire à une classique comme celle Ethereum sauf que celle-ci n'utilise pas de l'argent réel.</span>


[Lien vers Metamask](https://metamask.io/)

Sur Metamask, il faut penser à installer un nouveau réseau qui est en lien direct avec rinkeby. C'est à dire :
- URL de RPC : https://eth-rinkeby.alchemyapi.io/v2/gBWUHTr4HryIJClXreFI7ADDLXDodIjb
- Chain ID : 4
- Le symbole de la monnaie : ETH

[Lien vers la génération d'ethereum sur votre portefeuille Metamask](https://faucets.chain.link/rinkeby)

### Comment MINT une NFT sur NF7 :

1. Sélectionner une photo et ses data associées.
2. Il suffira ensuite de cliquer sur le bouton pour Mint sa NFT.
3. Il y aura ensuite l'extension Metamask qui recevra une demande de connexion depuis notre application si le compte n'est toujours pas lié avec notre site.
4. Par la suite, nous afficherons un lien pour consulter votre NFT et par la même occasion la voir sur notre site !

## <div id="dock">Lancer le docker de la bonne manière :</div>
### Il faut faire :
- root :
  - docker-compose build
  - docker-compose up
#### Facultatif
- backend : 
  - docker build -t node-app .
- frontend : 
  - docker build -t react-app .

## Commande pour lancer docker
- Linux : 
  - sudo systemctl start docker
- OSX : 
  - sudo launchctl start docker

# <div id="li">Logiciels à installer :</div>
## MongoDB Compass
[Lien pour dl Compass](https://www.mongodb.com/try/download/compass)

## Docker
[Lien pour dl Docker](https://www.docker.com/get-started/)

## Yarn ou NPM pour installer les librairies
- yarn install
- npm i -y

Dans le back et le front




