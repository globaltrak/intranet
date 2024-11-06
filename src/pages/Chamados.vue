<template>
  <q-page class="q-pa-sm q-py-sm">
  <div class="q-ma-sm">
    <h5>Chamados Abertos</h5>
    <q-list v-if="chamados.length > 0">
      <q-item v-for="chamado in chamados" :key="chamado.id">
        <q-item-section>
          <q-item-label>{{chamado.dono_chamado}}</q-item-label>
          <q-item-label>{{ chamado.created_at }}</q-item-label>
          <q-item-label>{{ chamado.titulo }}</q-item-label>
          <q-item-label caption lines="2">{{ chamado.texto }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else>
      <p>Nenhum chamado aberto encontrado.</p>
    </div>

    <h5>Chamados Fechados</h5>
    <!-- Lista para chamados fechados, se necessário -->
  </div>
</q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { supabase } from 'src/boot/supabase';

export default {
  setup() {
    const chamados = ref([]);

    const loadDados = async () => {
      const { data, error } = await supabase
        .from('Chamados')
        .select('*')
        //.eq('status', 'aberto'); // Filtrando chamados abertos, se houver um campo de status

      if (error) {
        console.error('Erro ao consultar dados: ' + error);
      } else {
        chamados.value = data;
      }
    };

    onMounted(() => {
      loadDados();
    });

    return {
      chamados
    };
  }
};
</script>

<style lang="scss" scoped>
/* Seus estilos aqui */
</style>
