import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { supabase } from 'src/boot/supabase.js'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {

    const { data: { user } } = await supabase.auth.getUser();

    if (user && to.path == '/login') {
      //se o usuario estiver logado e tentar acessar a págna de login, será redirecionado a páginja dashboard
      next('/dashboard');
    }else if(!user && to.path !== '/login' && to.path !== '/register'){
      //se o usuário não estiver logado e tentar acessar outra página, será redirecionado a página de login
      next('/login')

    } else {
      next();
    }
  });

  return Router
})
