<template>
  <q-list bordered>
    <q-item clickable v-for="item in menuItems" :key="item.title" @click="selectPage(item)">
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section >
        {{ item.title }}
      </q-item-section>


    </q-item>
  </q-list>
</template>

<script>
import { usePageTitleStore } from 'stores/pageTitleStore';
import { useRouter } from 'vue-router'; // Importando useRouter

export default {
  name: 'MenuComponent',
  setup() {
    const pageTitleStore = usePageTitleStore();
    const router = useRouter(); // Usando useRouter para obter o router

    const menuItems = [
      { title: 'DashBoard', route: '/dashboard', icon: 'home' },
      { title: 'Chamados', route: '/mytickets', icon: 'star' },
      { title: 'Abrir Chamado', route: '/newtickets', icon: 'settings' },

    ];

    const selectPage = (item) => {
      pageTitleStore.setTitle(item.title);
      router.push(item.route); // Usando router.push em vez de this.$router.push
    };

    return {
      menuItems,
      selectPage
    };
  }
};
</script>
