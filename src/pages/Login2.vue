<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="form.email"
                label="E-mail"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="form.password"
                label="Password"
                lazy-rules

              />

              <div>
                <q-btn label="Login" @click="handleLogin" to="/" type="button" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  setup() {
    const { login } = useAuthUser();
    const form = ref({
      email: '',
      password: ''
    })
    const handleLogin = async () =>{
      try {
        await login(form.value)
      } catch (error) {
        console.log(error);


      }

    }
    return {
      form,
      handleLogin,
      username: ref('Pratik'),
      password: ref('12345')
    }
  },
})
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
