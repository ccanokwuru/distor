import { RouteRecordRaw } from 'vue-router';
import Auth from './pages/Auth.vue';
import Dashboard from './pages/Dashboard.vue';
import Editor from './pages/Editor.vue';
import NotFound from './pages/NotFound.vue';


const editor: RouteRecordRaw = {
    path: '/doc/:id',
    name: 'doc',
    component: Editor,
}

const dashboard: RouteRecordRaw = {
    path: '/',
    // exact,
    name: 'dashboard',
    component: Dashboard,
}

const auth: RouteRecordRaw = {
    path: '/auth',
    name: 'auth',
    component: Auth
}

const notFound: RouteRecordRaw = {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
}


const routes: RouteRecordRaw[] = [
    auth,
    dashboard,
    editor,
    notFound,
]

export default routes;