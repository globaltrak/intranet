<template>
  <q-page padding>
    <p class="text-h5 text-center">Login</p>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <div class="col-md-6 col-sm-4 col-xs-12 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
        />
        <q-input
          label="Senha"
          v-model="form.password"
          type="password"
        />
      </div>
      <div class="full-width q-pt-md">
        <q-btn
          label="Login"
          color="primary"
          class="full-width"
          outline
          rounded
          type="submit"
        />
      </div>
      <div class="full-width q-gutter-y-sm">
        <q-btn
          label="Register"
          color="secondary"
          class="full-width"
          flat
          @click="register"
        />
        <q-btn
          label="Recuperar Senha"
          color="primary"
          class="full-width"
          flat
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import useAuthUser from 'src/composables/UseAuthUser';

export default defineComponent({
  name: 'PageLogin',
  setup(){
    const { login } = useAuthUser();
    const form = ref({
      email: '',
      password: ''
    });
    const router = useRouter(); // Create router instance

    const register = async ()=> {
      try {
        await router.push('/register')
      } catch (error) {
        console.log(error);

      }
    }

    const handleLogin = async () => {
      try {
        await login(form.value); // Ensure login is awaited if it returns a promise
        router.push('/dashboard'); // Use router instance to navigate
      } catch (err) {
        console.error(err);
      }
    };

    return {
      form,
      handleLogin,
      register
    };
  }
});
</script>
