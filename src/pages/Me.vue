<!-- src/pages/Me.vue -->
<template>
  <div class="q-pa-md">
    <q-spinner v-if="loading" size="40px" color="primary" />
    <p v-else>Processando sua verificação...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { supabase } from 'src/boot/supabase';

const loading = ref(true);
const router = useRouter();
const route = useRoute();
const $q = useQuasar();

onMounted(async () => {
  try {
    // Extrair tokens do URL
    const accessToken = route.hash.match(/access_token=([^&]*)/)?.[1];
    const refreshToken = route.hash.match(/refresh_token=([^&]*)/)?.[1];

    if (accessToken && refreshToken) {
      // Configura a sessão no Supabase para autenticar o usuário
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) throw error;

      $q.notify({ type: 'positive', message: 'E-mail verificado com sucesso! Você está logado.' });
      router.push('/');
    } else {
      $q.notify({ type: 'negative', message: 'Erro ao verificar o e-mail.' });
      router.push('/login');
    }
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: 'Erro ao verificar o e-mail.' });
    router.push('/login');
  } finally {
    loading.value = false;
  }
});
</script>
