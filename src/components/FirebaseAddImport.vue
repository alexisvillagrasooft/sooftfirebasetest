<template>
  <v-row class="pb-5">
    <v-col cols="12" justify="center">
      <div class="body-2">
        Por favor, importar un archivo .xlsx con el siguiente formato:
        <a
          href="/ejemplos/importar-ejemplo.xlsx"
          download="importar-ejemplo.xlsx"
        >
          <v-icon small color="success">mdi-file-excel-outline</v-icon></a
        >
      </div>
    </v-col>
    <v-col cols="12">
      <file-pond
        name="file"
        ref="pond"
        label-idle="Arrastra el archivo aqui..."
        labelFileProcessingComplete="Subida completa"
        labelFileProcessingAborted="Subida Cancelada"
        labelInvalidField="El archivo tiene un formato no permitido"
        labelFileProcessing="Subiendo"
        labelTapToCancel="Toca para cancelar"
        labelTapToRetry="Toca para reintentar"
        labelTapToUndo="Toca para eliminar"
        v-bind:allow-multiple="true"
        v-bind:server="myServer"
        accepted-file-types="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        v-on:init="handleFilePondInit"
        v-on:processfile="handleFileProcess"
        v-on:processfiles="handleFilesProcess"
        labelFileProcessingSuccess="Hola"
      />
    </v-col>
    <v-col cols="12" class="text-right">
      <v-btn
        :loading="loadingImport"
        :disabled="loadingImport || !this.myFiles.length"
        color="info"
        rounded
        outlined
        small
        @click="importFile"
      >
        Importar
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import * as XLSX from "xlsx";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "FirebaseAddImport",
  props: { saveMultiple: { type: Function }, loading: { type: Boolean } },
  data: () => ({
    loadingImport: false,
    myFiles: [],
    myServer: {
      process: (name, file, meta, load) => {
        load(Date.now());
      },
    },
  }),
  methods: {
    handleFilePondInit() {
      //   console.log("Init");
    },
    handleFileProcess() {
      //   console.log("handleFileProcess!");
    },
    handleFilesProcess() {
      this.myFiles = this.$refs.pond.getFiles();
    },
    async importFile() {
      const file = await this.myFiles[0].file.arrayBuffer();
      const wb = XLSX.read(file, {
        type: "buffer",
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      await this.saveMultiple(data);
      this.$refs.pond.removeFile();
      this.myFiles = this.$refs.pond.getFiles();
    },
  },
  components: {
    FilePond,
  },
  watch: {
    loading: {
      immediate: true,
      handler(val) {
        this.loadingImport = val;
      },
    },
  },
};
</script>

<style scoped>
a,
u {
  text-decoration: none;
}
</style>
