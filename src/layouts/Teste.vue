<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" >
      <q-header >
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
          <q-space/>
          <div class="q-gutter-sm row items-center no-wrap">
            <q-btn round dense flat color="white" icon="fab fa-github" type="a"
                 href="https://github.com/pratik227/quasar-admin" target="_blank">
          </q-btn>
          <q-btn round dense flat color="white" type="a" href="https://github.com/sponsors/pratik227"
                 target="_blank">
            <i class="fa fa-heart fa-2x fa-beat"></i>
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
          </q-btn>

          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        bordered
        class="bg-primary text-white"

        :mini="!drawer || miniState"
        @click.capture="drawerClick"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <MenuComponent/>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
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

      <q-page-container >
        <router-view class="q-pt-none q-mt-none"/>
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { usePageTitleStore } from 'stores/pageTitleStore'
import MenuComponent from 'src/components/MenuComponent.vue';

export default {
  components: {
    MenuComponent

  },
  setup () {
    const pageTitleStore = usePageTitleStore();
    const pageTitle = computed(() => pageTitleStore.title)
    const miniState = ref(false)

    return {
      pageTitle,
      drawer: ref(false),
      miniState,

      drawerClick (e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation()
        }
      }
    }
  }
}
</script>
