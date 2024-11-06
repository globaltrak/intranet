<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <div class="row q-col-gutter-md">
        <!-- Input de arquivo nativo -->
        <input
          type="file"
          accept=".xlsx, .xls"
          @change="onFileChange"
          class="q-mb-md"
        />

        <!-- Tabela de dados -->
        <q-table
          v-if="devices.length"
          :rows="devices"
          :columns="columns"
          row-key="imei"
          class="q-mt-md"
        />


      </div>
      <!-- Botão para cadastrar -->
      <div class="row justify-end q-mt-md">
        <q-btn label="Cadastrar" color="primary" @click="cadastrarDispositivos" />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      devices: [], // Dados da planilha
      columns: [
        { name: 'tipo', label: 'Tipo', field: 'tipo' },
        { name: 'nombre', label: 'Nome/ID', field: 'nombre' },
        { name: 'imei', label: 'IMEI', field: 'imei' },
        { name: 'marca', label: 'Marca', field: 'marca' },
        { name: 'modelo', label: 'Modelo', field: 'modelo' },
        { name: 'zona', label: 'Zona', field: 'zona' }
      ]
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Processa os dados e armazena na lista de dispositivos
          this.processarDadosPlanilha(jsonData);
        };

        reader.readAsArrayBuffer(file);
      } else {
        console.error('Nenhum arquivo selecionado.');
      }
    },
    processarDadosPlanilha(data) {
      this.devices = data.slice(1).map((row) => ({
        tipo: row[0] || '',
        nombre: row[1] || '',
        imei: row[2] || '',
        marca: row[3] || '',
        modelo: row[4] || '',
        zona: row[5] || ''
      }));
    },
    async cadastrarDispositivos() {
    for (const device of this.devices) {
      try {
        await this.$axios.post('http://localhost:3000/createDevice', {
          tipo: device.tipo,
          nombre: device.nombre,
          imei: device.imei,
          marca: device.marca,
          modelo: device.modelo,
          zona: device.zona
        });
        console.log(`Dispositivo ${device.nombre} cadastrado com sucesso!`);
      } catch (error) {
        console.error(`Erro ao cadastrar o dispositivo ${device.nombre}:`, error);
      }
    }
  }
  }
};
</script>
