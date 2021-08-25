<template>
  <div class="uploader">
    <q-uploader
      url="http://localhost:4444/upload"
      multiple
      flat
      auto-upload
    >
      <template v-slot:header="scope">
        <div class="header">
          <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
            <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
              <q-tooltip>Limpar Imagens</q-tooltip>
            </q-btn>
            <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
              <q-tooltip>Deletar Imagem</q-tooltip>
            </q-btn>
            <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
            <div class="col titleHeader">
              <div class="q-uploader__title">Anexar Imagens</div>
              <div class="q-uploader__subtitle">Tamanho: {{ scope.uploadSizeLabel }} / Envio: {{ scope.uploadProgressLabel }}</div>
            </div>
            <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
              <q-uploader-add-trigger />
              <q-tooltip>Inserir Imagens</q-tooltip>
            </q-btn>
            <!-- <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="scope.upload" round dense flat >
              <q-tooltip>Enviar Imagens</q-tooltip>
            </q-btn> -->

            <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
              <q-tooltip>Cancelar envio</q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>

      <template v-slot:list="scope">
        <q-list separator >

          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                Status: {{ file.__status }}
              </q-item-label>

              <q-item-label caption>
                Tamanho: {{ file.__sizeLabel }} / Envio: {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>

    </q-uploader>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
    edit: {
      required: false
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus">
.uploader
  width 100%
  background #FFFFFF
  .q-uploader
    width 100%
    background #FFFFFF
    .header
      background #FFFFFF
      border-radius 3px
      border 2px dashed #9EA0A5
      color #22335F
      .titleHeader
        display flex
        width 100%
        flex-direction row
        justify-content center
        div
          display flex
          width 100%
          margin 10px
</style>
