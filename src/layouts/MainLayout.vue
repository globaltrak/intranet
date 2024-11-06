<template>
  <q-layout view="hHh LpR fFf">

    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Globaltrak
          <q-btn flat dense icon="home"/>
        </q-toolbar-title>
        <q-btn flat dense icon="logout" @click="onLogout"/>
      </q-toolbar>

      <q-tabs align="center" left-icon="arrow_left" >
        <q-route-tab to="/newTicket" label="Abrir chamado" />
        <q-route-tab to="/myTickets" label="Meus chamados" />
        <q-route-tab to="/conhecimento" label="Base de Conhecimento" />
      </q-tabs>
    </q-header>

    <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    :mini="!drawer || miniState"
    @click.capture="drawerClick"
    >
      <q-list bordered separator >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bluetooth"/>
          </q-item-section>
          <q-item-section>
          <q-item-label>Abrir chamado</q-item-label>
        </q-item-section>
        </q-item>


        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth"/>
          </q-item-section>
          <q-item-section>
          <q-item-label>Cadastro Módulo RedGps</q-item-label>
        </q-item-section>

        </q-item>

      </q-list>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { supabase } from 'src/boot/supabase';
import { useRouter } from 'vue-router';
import { ref } from 'vue'


export default {
  setup () {
    const router = useRouter()
    const leftDrawerOpen = ref(false)
    const miniState = ref(false)


    return {
      miniState,
      leftDrawerOpen: ref(false),
      async onLogout(){
      await supabase.auth.signOut();
      router.push('/login')
    },
    drawerClick (e) {
        if (miniState.value) {
          miniState.value = false
          e.stopPropagation()
        }
      },
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }

    }


  }
}
</script>
