// src/composables/cardProvider.tsx

import _ from "lodash-es";

export default function useCardProvider() {
  return {
    findAll: () => {
      return _.cloneDeep(cards);
    },
    find: (cardId: string | number) => {
      return _.find(cards, ["id", cardId]);
    },
  };
}

const cards = [
  {
    id: 1,
    icon: "paint-roller",
    category: "partner",
    title:
      "Développer des interfaces graphiques sophistiqués pour votre site internet ou votre application mobile",
    body: "Création d'interfaces intuitives pour donner accès à vos services et proposer une expérience digitale confortable et inédite en faveur de l’engagement de vos utilisateurs.",
  },
  {
    id: 2,
    icon: "server",
    category: "partner",
    title:
      "Développer des dispositifs efficaces pour stocker et analyser des données sur le Web",
    body: "Création de dispositifs pour vous permettre d’organiser et de structurer des ensembles d’informations et vous aider à analyser en détail et en temps réel votre activité.",
  },
  {
    id: 3,
    icon: "building-flag",
    category: "advance",
    title:
      "Installer et maintenir l’hébergement, les noms de domaine et déployer les applications dans les stores",
    body: "Gestion des aspects techniques de l'hébergement et du nom de domaine pour un accès optimal à vos services et une sécurité renforcée de vos propriétés numériques.",
  },
  {
    id: 4,
    icon: "envelope-open",
    category: "advance",
    title: "Créer et paramétrer des adresses emails professionnelles",
    body: "Prise en charge de la création et du paramétrage des boîtes mail professionnelles pour établir une communication de qualité avec vos contacts.",
  },
  {
    id: 5,
    icon: "folder-tree",
    category: "advance",
    title:
      "Analyser, nettoyer et optimiser les fichiers, les bases de données et les registres d’activité pour plus de vélocité",
    body: "Mise en place de mécanismes et des traitements pour enregistrer et retrouver toutes l’information nécessaire au fonctionnement de votre activité comme les évènements, les participants, la comptabilité, l’après-vente, etc.",
  },
  {
    id: 6,
    icon: "user-shield",
    category: "starter",
    title:
      "Gérer la collecte des données personnelles et professionnelles en toute sérénité",
    body: "Installation et maintenance des outils et des logiciels nécessaires pour un traitement de vos données personnelles et celles de vos contacts plus simple, confidentiel et sécurisé.",
  },
  {
    id: 7,
    icon: "clapperboard",
    category: "starter",
    title: "Aide à la création de contenu multimédia",
    body: "Assistance pour la prise en main d’outil dédiées à la création graphique et audiovisuelle, accompagnement à la production de textes adaptés pour les visiteurs.",
  },
  {
    id: 8,
    icon: "arrow-right-to-city",
    category: "starter",
    title: "Aide à la prise en main d’outils numériques",
    body: "Assistance technique personnalisée pour la prise en main d’outils dédiés à la productivité comme la bureautique, les agendas électroniques, les gestionnaires de mots de passe, les fichiers et téléchargements, la sécurité, et d’autres encore.",
  },
  {
    id: 9,
    icon: "paintbrush",
    category: "starter",
    title:
      "Intégrer des pages, des styles, des illustrations et des textes pour favoriser l’engagement",
    body: "Insertion des articles de blog, des fiches produits, des pages de description et des éléments multimédia, optimisation pour l’ergonomie, les performances et les moteurs de recherche.",
  },
  {
    id: 10,
    icon: "download",
    category: "starter",
    title:
      "Permettre la sauvegarde et la récupération complète des fichiers et des données pour disposer d’un historique",
    body: "Mise en place de systèmes de sauvegarde et de récupération pour garantir la sécurité des données et assurer la continuité des services en ligne.",
  },
  {
    id: 11,
    icon: "arrows-left-right-to-line",
    category: "starter",
    title:
      "Convertir les créations dans des formats adaptés pour les réseaux sociaux et les différents appareils",
    body: "Chaque plateforme de service en ligne fonctionne de manière particulière pour répondre à la demande de ses propres utilisateurs, ainsi les publications doivent être au bon format pour la compatibilité avec les appareils et pour atteindre le public cible.",
  },
  {
    id: 12,
    icon: "stethoscope",
    category: "starter",
    title:
      "Optimiser régulièrement les performances et mettre à niveau des dispositifs de sécurité",
    body: "Optimisation de la performance de vos site et application, installation des mises à jour, veille de sécurité sur toutes les technologies, notre équipe assure le fonctionnement continu de vos activités numériques.",
  },
];
