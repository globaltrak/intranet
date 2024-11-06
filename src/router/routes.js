import Teste from 'layouts/Teste.vue';
import Chamados from 'src/pages/Chamados.vue';
import AbrirChamado from 'src/pages/AbrirChamado.vue';
import Login from 'src/pages/Login3.vue';
import Dashboard from 'src/pages/Dashboard.vue';
import Cadastro from 'src/pages/CadModulosRedGps.vue'
import Registrar from 'src/pages/Registrar.vue';
import Me from 'src/pages/Me.vue';



const routes = [
  {
    path: '/',
    component: Teste,
    children: [
      {path: 'mytickets', component: Chamados},
      {path: 'newtickets', component: AbrirChamado},
      {path: 'login', component: Login},
      {path: 'dashboard', component: Dashboard},
      {path: 'cadastro', component: Cadastro},
      {path: 'register', component: Registrar},
      {path: 'me', component: Me},
    ]
  }
];

export default routes;
