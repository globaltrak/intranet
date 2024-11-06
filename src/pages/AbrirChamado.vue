<template>
  <q-page padding>
    <div class="row  ">
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
      @submit.prevent="onSubmit"
      @reset="resetFormChamado"
      >
        <q-select
        label="Demanda"
        v-model="formChamado.demanda"
        :options="optionsDemanda"

        filled
        />
        <q-input
        label="Titulo"
        v-model="formChamado.titulo"

        filled
        />
        <q-select
        label="Urgência"
        :options="optionsUrgencia"
        v-model="formChamado.urgencia"

        filled
        />
        <q-editor
        v-model="formChamado.texto"
        />
        <div class="q-gutter-md">
          <q-btn label="Abrir chamado" type="submit" color="primary"/>
          <q-btn label="Limpar campos" type="reset"/>
        </div>
      </q-form>
    </div>

  </q-page>
</template>

<script>
import { ref } from 'vue';
import { Notify } from 'quasar'
import { supabase } from 'src/boot/supabase'
export default {
  setup () {
    const optionsDemanda = ref([
      {label: 'Troca de Placa', value: 'trocaplaca'},
      {label: 'Cancelamento de Linha', value: 'cancelamentoLinha'},
      {label: 'Programação de Módulos', value: 'programacaoModulo'},
      {label: 'Controle de Velocidade', value: 'controleVelocidade'},
    ])
    const optionsUrgencia = ref([
      {label: 'Suave', value: 'suave'},
      {label: 'Média', value: 'media'},
      {label: 'Urgente', value: 'urgente'},
    ])
    const formChamado = ref({
      demanda: '',
      titulo: '',
      urgencia: '',
      texto: ''
    })

    const onSubmit = async ()=>{
      try {
        const dadosParaSalvar = {
          ...formChamado.value,
          demanda: formChamado.value.demanda.value,
          urgencia: formChamado.value.urgencia.value
        }
        const { data, err} = await supabase
        .from('Chamados')
        .insert(dadosParaSalvar)
        console.log('Formulário enviado com sucesso: ', data);
        Notify.create({
          message: 'Chamado registrado com sucesso!'
        })
        resetFormChamado()
      } catch (error) {
        console.error(error)
      }
    }

    const resetFormChamado = async () =>{
      try {
        formChamado.value.demanda = '',
        formChamado.value.titulo = '',
        formChamado.value.urgencia = '',
        formChamado.value.texto = ''
      } catch (error) {
        console.error(error)
      }
    }


    return {
      optionsDemanda,
      formChamado,
      optionsUrgencia,
      onSubmit,
      resetFormChamado
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
