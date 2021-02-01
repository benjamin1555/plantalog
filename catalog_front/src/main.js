import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

const BaseButton = defineAsyncComponent(() => import('./components/ui/BaseButton.vue'));
const BaseCard = defineAsyncComponent(() => import('./components/ui/BaseCard.vue'));
const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));
const BaseSpinner = defineAsyncComponent(() => import('./components/ui/BaseSpinner.vue'));
const BasePagination = defineAsyncComponent(() => import('./components/ui/BasePagination.vue'));
const BaseProgressBar = defineAsyncComponent(() => import('./components/ui/BaseProgressBar.vue'));

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);
app.component('base-pagination', BasePagination);
app.component('base-progress-bar', BaseProgressBar);

app.mount('#app');
