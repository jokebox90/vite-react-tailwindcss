# Vite React TailwindCSS

Ce projet est un modèle de base pour une application React utilisant Vite et Tailwind CSS. Il est configuré mettant l'accent sur la maintenabilité et l'expérience de développement.

## Installation

Tout d'abord, clonez le dépôt :

```bash
git clone https://github.com/jokebox90/vite-react-tailwindcss.git
```

Ensuite, naviguez dans le répertoire du projet et installez les dépendances :

```bash
cd vite-react-tailwindcss
yarn install
```

## Utilisation

Le projet comprend plusieurs scripts pour des tâches de développement courantes :

    yarn dev: Démarre le serveur de développement Vite.
    yarn build: Compile l'application pour la production.
    yarn lint: Exécute ESLint sur le répertoire src.
    yarn preview: Sert la version de production de l'application.

## Dépendances

Le projet utilise les dépendances clés suivantes :

* **react et react-dom:** Pour la construction de l'interface utilisateur.

* **react-router-dom:** Pour le routage et la navigation entre les composants.

* **vite:** Pour une expérience de développement plus rapide et plus légère.

* **tailwindcss:** Pour le CSS utility-first qui permet de composer des interfaces efficaces.

* **gsap:** Pour créer des animations sur les pages de manière plus structurée et plus simple.

* **typescript:** Pour les types statiques et l'assurance d'un code bien structuré.

* **eslint:** Pour le linting et le maintien de la qualité du code.

## Structure du projet

Bienvenue dans le coffre aux trésors, il est rempli d'outils qui constituent toute la richesse du projet.

* **App.tsx**

Le fichier App.tsx est le point d'entrée de l'application React. Il contient les routes vers toutes les pages de l'application et démarre le composant principal. Il agit comme son chef d'orchestre, c'est le départ de toutes les pistes que l'utilisateur peut emprunter et expérimenter lors de sa navigation à travers l'application. Si nous naviguons vers le chemin "/", nous pouvons voir le composant Home, et si nous naviguons vers "/about", nous pouvons voir le composant About.

* **Root.tsx**

L'application contient un composant Root utilisé lors de l'ouverture de chaque page. Il agit comme un gabarit qui englobe un autre composant chargé du rendu final et permet de partger des fonctionnalités entre plusieurs pages.

* **pages:** La structure, chaque page est une pièce unique qui s'assemble pour former une application.

* **composables:** La matière, où nous gardons des fonctions réutilisables pour ajouter des fonctionnalités à nos composants.

* **components:** L'équipement, des briques de code réutilisables qui s'assemblent pour construire l'interface utilisateur.

* **assets:** Saccoche où nous gardons toutes nos images, icônes et autres fichiers multimédias.

### TailwindCSS

Il est courant de définir des classes personnalisées pour les balises HTML afin de leur appliquer un style spécifique. Dans ce projet, cela est fait en ajoutant l'attribut "className" à la balise HTML et en définissant le style de cette classe dans une feuille de style CSS à part.

Dans le cas d'une feuille de style CSS classique, nous définissons alors le style pour "message-succes" :

```css
.message-succes {
  background-color: green;
  color: white;
}
```

Cet exemple affiche en effet un texte blanc sur un fond vert.

Cependant, nous utilisons TailwindCSS, une bibliothèque de styles fortement personnalisable, nous nous servons donc de sa directive "@apply" pour appliquer un ensemble de styles spécifiques à une classe personnalisée. Cela nous permet de composer des styles complexes et de réutiliser de façon pertinente avec peu de code.

Par exemple, nous définissons une classe personnalisée qui applique un ensemble de styles Tailwind en utilisant "@apply" :

```css
.message-succes {
  @apply bg-green-500 text-white;
}
```

Cet exemple utilise "@apply" est pour appliquer les styles de TailwindCSS "bg-green-500" et "text-white" à "message-succes". Cela aura le même effet que l'exemple précédent, rendant le texte blanc sur un fond vert.

L'utilisation de TailwindCSS et de la directive "@apply" nécessite la présence des instructions suivantes au tout début de la principale feuille de style CSS :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## GSAP (GreenSock Animation Platform)

GSAP est une bibliothèque JavaScript robuste et performante. Elle nous permet de créer des animations complexes avec une syntaxe facile à utiliser. Dans ce projet, nous utilisons GSAP pour animer les logos de l'application.

Dans le fichier **Logos.tsx**, GSAP est utilisé pour créer deux genre d'animations :

* **Une rotation continue** du logo React. Cette animation fait tourner le logo React de 360 degrés en boucle, elle crée un effet de rotation continue.

* **Une transition horizontal** du logo. Cette animation déplace le logo de gauche à droite, elle crée un effet de balancement.

Voici un exemple de l'utilisation de GSAP dans Logos.tsx :

```ts
const ctx = gsap.context(() => {
  tl.current = gsap
    .timeline()
    .to(".logo.react", { rotate: 360, repeat: -1, duration: 20, ease: "linear" });
  t2.current = gsap
    .timeline({ delay: 1.5, yoyo: true })
    .to(".logo", { x: -100 })
    .to(".logo", { x: 100 })
    .to(".logo", { x: 0 });
}, el);
```

Dans le fichier Logos.tsx, nous utilisons **useRef** pour créer une référence à l'élément div qui contient les logos. Nous passons ensuite cette référence à GSAP pour créer les animations. Cela permet de contrôler avec précision quels éléments sont animés par GSAP.

Voici comment les Refs sont utilisées dans Logos.tsx :

```ts
const el = useRef<HTMLDivElement>(null);

// ...

const ctx = gsap.context(() => {
  // ...
}, el);
```

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une pull request.
