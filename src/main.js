import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const button = document.getElementById('re');
button.addEventListener('click', event => {
    window.location.reload();
});