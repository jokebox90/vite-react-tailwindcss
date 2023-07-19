// src/composables/checkListProvider.ts

import _ from "lodash-es";

export default function useCheckListProvider() {
  return {
    findAll: () => {
      return _.cloneDeep(lists);
    },
    find: (listId: string | number) => {
      return _.find(lists, ["id", listId]);
    },
  };
}

const lists = [
  {
    id: 1,
    body: [
      {
        id: 1,
        icon: "circle-check",
        text: "Développement d’interfaces Web et mobile",
      },
      {
        id: 2,
        icon: "circle-check",
        text: "Développement de bases de données",
      },
      {
        id: 3,
        icon: "circle-check",
        text: "Intégration de contenu multimédia",
      },
      {
        id: 4,
        icon: "circle-check",
        text: "Aide à la création de contenu multimédia",
      },
      {
        id: 5,
        icon: "circle-check",
        text: "Aide à la prise en main d’outils numériques",
      },
      {
        id: 6,
        icon: "circle-check",
        text: "Conversion de contenu pour les réseaux sociaux",
      },
      {
        id: 7,
        icon: "circle-check",
        text: "Gestion de boites email professionnelles",
      },
      {
        id: 8,
        icon: "circle-check",
        text: "Création d’hébergement Web et de nom de domaine",
      },
      {
        id: 9,
        icon: "circle-check",
        text: "Analyse et optimisation des données",
      },
      {
        id: 10,
        icon: "circle-check",
        text: "Optimisation des technologies et de la sécurité",
      },
      {
        id: 11,
        icon: "circle-check",
        text: "Sauvegarde et récupération des données",
      },
      {
        id: 12,
        icon: "circle-check",
        text: "Confidentialité des données personnelles",
      },
    ],
  },
];
