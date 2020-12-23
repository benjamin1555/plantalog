import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      lastAddedDisease: null,
      diseases: [
        {
          _id: '5fb58ffaced5dfa8e0928b54',
          name: 'virose',
          symptoms: `Les feuilles jaunissent et s'assèchent. L'arbre ne produit pas de fruit`,
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          treatment: `Arracher les plants touchés par la maladie. Traiter au purin d'ortie`
        },
        {
          _id: '5fb58ffaced5dfa8e0928b62',
          name: 'anthracnose',
          symptoms: 'tâches noires sur le fruit',
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          treatment: `Traitement préventif à base d'ail ou de prêle`
        },
        {
          _id: '5fb590e4ced5dfa8e0928b63',
          name: 'mildiou',
          symptoms: 'Tâches noires sur le fruit et les feuilles. Dessèchement de la plante',
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          treatment: `Traitement en apportant des minéraux à l'aide d'un purin d'ortie`
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};