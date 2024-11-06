<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
      <q-card-section class="text-h6 text-center">
        <q-icon name="person_add" size="40px" color="primary" class="q-mb-md" />
        Cadastro
      </q-card-section>

      <q-card-section>
        <!-- Define a referência do formulário -->
        <q-form @submit.prevent="onSubmit" ref="formRef">
          <q-input
            v-model="email"
            label="Email"
            filled
            dense
            :rules="[val => !!val || 'Email é obrigatório', val => /.+@.+\..+/.test(val) || 'Email inválido']"
            type="email"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="nome"
            label="Nome"
            filled
            dense
            :rules="[val => !!val || 'Nome é obrigatório', val => val.length >= 6 || 'O Nome deve ter no mínimo 6 caracteres']"
            type="name"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            label="Senha"
            filled
            dense
            :rules="[val => !!val || 'Senha é obrigatória', val => val.length >= 6 || 'Senha deve ter no mínimo 6 caracteres']"
            type="password"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="password" />
            </template>
          </q-input>

          <q-btn
            label="Cadastrar"
            color="primary"
            type="submit"
            unelevated
            class="full-width q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import useAuthUser from 'src/composables/UseAuthUser';

const $q = useQuasar();
const email = ref('');
const nome = ref('');
const password = ref('');
const formRef = ref(null);  // Defina uma referência para o formulário
const { register } = useAuthUser();

const onSubmit = async () => {
  // Acesse o formulário usando `formRef.value`
  if (await formRef.value.validate()) {
    try {
      // Chama a função de registro e passa os dados necessários
      await register({
        email: email.value,
        password: password.value,
        nome_completo: nome.value,  // passando o nome completo
      });

      // Notifica sucesso do cadastro
      $q.notify({ type: 'positive', message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
      // Notifica em caso de erro
      $q.notify({ type: 'negative', message: error.message || 'Erro ao realizar cadastro' });
    }
  } else {
    $q.notify({ type: 'negative', message: 'Preencha os campos corretamente' });
  }
};
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
}
.q-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
