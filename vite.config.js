import {defineConfig} from 'vite';
import config from './config/cracan.json' with {type:'json'};
export default defineConfig(({mode})=>({define:{__SITE__:JSON.stringify('cracan'),__FIREBASE__:JSON.stringify(mode==='test'?{apiKey:'demo-key',authDomain:'demo-cracan.firebaseapp.com',projectId:'demo-four-sites'}:config)}}));
