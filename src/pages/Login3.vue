<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
      <q-card-section class="text-h6 text-center">
        <q-icon name="login" size="40px" color="primary" class="q-mb-md" />
        Entrar
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" ref="form">
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
            v-model="password"
            label="Senha"
            filled
            dense
            :rules="[val => !!val || 'Senha é obrigatória', val => val.length >= 6 || 'Senha deve ter no mínimo 6 caracteres']"
            type="password"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <q-btn
            label="Entrar"
            color="primary"
            type="submit"
            unelevated
            class="full-width q-mt-md"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat label="Esqueceu a senha?" color="primary" @click="recoverPassword" />
      </q-card-actions>

      <q-card-actions align="center">
        <q-btn dense label="Registrar" color="primary" @click="register" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router'; // importando o useRouter
import useAuthUser from 'src/composables/UseAuthUser';

const $q = useQuasar();
const email = ref('');
const router = useRouter(); // cria a instância router
const password = ref('');
const { login } = useAuthUser();

const register = async ()=> {
  try {
    await router.push('/register')
  } catch (error) {
    console.log(error);


  }
}

const onSubmit = () => {
  if ($refs.form.validate()) {
    // Lógica de autenticação aqui
    $q.notify({ type: 'positive', message: 'Login realizado com sucesso!' });
  } else {
    $q.notify({ type: 'negative', message: 'Preencha os campos corretamente' });
  }
};

const recoverPassword = () => {
  $q.notify({ message: 'Redirecionando para recuperação de senha...' });
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
