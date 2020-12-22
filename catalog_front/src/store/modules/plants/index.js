import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      foundPlants: [],
      plants: [
        {
          _id: '5fb575048396009e9d066d08',
          species: 'pomme',
          variety: 'granny',
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          plantationType: 'graine',
          plantationDate: '2020-12-04T00:00:00.000Z',
          harvestDate: '2021-03-15T00:00:00.000Z',
          beneficialInteractions: [],
          harmfulInteractions: [],
          diseases: []
        },
        {
          _id: '5fb575048396009e9d066d03',
          species: 'pomme',
          variety: 'gala',
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          plantationType: 'graine',
          plantationDate: '2020-12-04T00:00:00.000Z',
          harvestDate: '2021-03-15T00:00:00.000Z',
          beneficialInteractions: ['5fb575048396009e9d066d08'],
          harmfulInteractions: ['5fb575048396009e9d066dr4', '5fb575048396009e9d066d92'],
          diseases: [],
          notes: 'Quelques informations à propos de la pomme gala.'
        },
        {
          _id: '5fb575048396009e9d066d05',
          species: 'pomme',
          variety: '',
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          plantationType: 'graine',
          plantationDate: '2020-12-04T00:00:00.000Z',
          harvestDate: '2021-03-15T00:00:00.000Z',
          beneficialInteractions: [],
          harmfulInteractions: [],
          diseases: []
        },
        {
          _id: '5fb575048396009e9d066dr4',
          species: 'tomate',
          variety: 'ancienne',
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          plantationType: 'graine',
          plantationDate: '2020-12-04T00:00:00.000Z',
          harvestDate: '2021-03-15T00:00:00.000Z',
          beneficialInteractions: [],
          harmfulInteractions: [],
          diseases: []
        },
        {
          _id: '5fb575048396009e9d066e31',
          species: 'laitue',
          variety: '',
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          plantationType: 'graine',
          plantationDate: '2020-12-04T00:00:00.000Z',
          harvestDate: '2021-03-15T00:00:00.000Z',
          beneficialInteractions: [],
          harmfulInteractions: [],
          diseases: []
        },
        {
          _id: '5fb575048396009e9d066d92',
          species: 'aubergine',
          variety: '',
          imagesUrl: {
            regular: 'default/default_regular.png',
            thumbnail: 'default/default_thumbnail.png',
            icon: 'default/default_icon.png'
          },
          plantationType: 'graine',
          plantationDate: '2020-12-04T00:00:00.000Z',
          harvestDate: '2021-03-15T00:00:00.000Z',
          beneficialInteractions: [],
          harmfulInteractions: [],
          diseases: []
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};