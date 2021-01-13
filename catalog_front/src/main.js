import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BasePagination from './components/ui/BasePagination.vue';
import BaseProgressBar from './components/ui/BaseProgressBar.vue';
import BaseTooltip from './components/ui/BaseTooltip.vue';
import BaseFlash from './components/ui/BaseFlash.vue'; // TODO

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);
app.component('base-pagination', BasePagination);
app.component('base-progress-bar', BaseProgressBar);
app.component('base-tooltip', BaseTooltip);
app.component('base-flash', BaseFlash);

app.mount('#app');
