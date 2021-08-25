<template>
  <q-dialog
    v-model="modal"
    persistent
    :maximized="full"
    :full-width="fullWidth"
    :full-height="fullHeight"
    transition-hide="flip-up"
  >
    <q-card :style="`min-width: ${size}px !important`">
      <ValidationObserver ref="observer">
        <form @submit.prevent="Save()">
          <q-bar :style="getStyle">
            <div class="cursor-pointer">{{ titulo }}</div>
            <q-space />
            <q-btn
              dense
              flat
              icon="fas fa-times-circle"
              @click="modal = false"
              v-if="!noClose"
            />
          </q-bar>
          <q-card-section class="container-page scroll" style="max-height: 85%">
            <div class="row">
              <slot></slot>
            </div>
          </q-card-section>
          <q-separator v-if="!noButtons" />
          <q-card-actions class="actions flex-center" v-if="!noButtons">
            <q-btn
              color="blueJMD"
              :label="labelCancelar"
              v-close-popup
              icon="close"
              v-if="!noClose"
            ></q-btn>
            <q-btn
              color="blueJMD"
              :label="labelSave"
              icon="save"
              type="submit"
            ></q-btn>
          </q-card-actions>
          <slot name="buttons"> </slot>
        </form>
      </ValidationObserver>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    value: {
      required: true
    },
    titulo: {
      default: null
    },
    maximized: {
      default: false,
      type: Boolean
    },
    noButtons: {
      type: Boolean,
      default: false
    },
    noClose: {
      type: Boolean,
      default: false
    },
    labelCancelar: {
      default: 'Cancelar',
      type: String,
      required: false
    },
    labelSave: {
      default: 'Salvar',
      type: String,
      required: false
    },
    small: {
      type: Boolean,
      default: false
    },
    medium: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    modal: false
  }),
  mounted() {
    this.modal = this.value
  },
  methods: {
    async Save() {
      const success = await this.$refs.observer.validate()
      if (success) {
        this.$emit('submit', true)
      }
    },
    Fechar() {
      if (!this.noClose) {
        this.modal = false
      }
    }
  },
  computed: {
    getStyle() {
      return {
        background: '#22335F !important'
      }
    },
    full() {
      if (this.maximized) return true
      else if (this.$q.screen.width <= 760) return true
      else return false
    },
    size() {
      if (this.small) return 300
      else if (this.medium) return 700
      else return 1024
    }
  },
  watch: {
    value() {
      this.modal = this.value
    },
    modal() {
      this.$emit('input', this.modal)
    }
  }
}
</script>
<style lang="stylus" scoped>
.q-card
  // width 100% !important
  padding-bottom: 10px
  // min-width 1024px !important
  form
    width 100%
  .q-bar
    background: $colorPadrao
    color #fff
  .actions
    button
      font-family 'Roboto'
      font-size 12px
      font-weight 500
      text-transform capitalize
      padding: 4px 16px
@media (max-width: 1032px)
  .q-card
    min-width 200px !important
</style>
