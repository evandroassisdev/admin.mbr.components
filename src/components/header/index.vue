<template>
  <div id="Header">
    <div>
      <h4>{{ title }}</h4>
    </div>
    <div class="box-right text-right">
      <div v-if="btnNew">
        <q-btn
          color="blueJMD"
          :label="titleBTN"
          icon="fas fa-plus"
          @click="modal = true"
        />
      </div>
      <div v-if="btnNewGroup">
        <q-btn
          color="blueJMD"
          :label="titleBTNGroup"
          icon="fas fa-plus"
          @click="modalGroup = true"
        />
      </div>
    </div>
    <MModal
      v-model="modal"
      v-if="modal"
      :titulo="titleModal"
      @submit="handleSubmit()"
    >
      <slot name="register"></slot>
    </MModal>
    <MModal
      v-model="modalGroup"
      v-if="modalGroup"
      :titulo="titleModalGroup"
      @submit="handleSubmit()"
    >
      <slot name="group"></slot>
    </MModal>
  </div>
</template>
<script>
import MModal from '../form/m-modal'
export default {
  props: {
    value: {
      required: false
    },
    title: {
      required: false
    },
    btnNew: {
      required: false,
      type: Boolean,
      default: false
    },
    titleBTN: {
      required: false,
      default: 'Titulo'
    },
    titleModal: {
      required: false,
      default: 'titleModal'
    },
    btnNewGroup: {
      required: false,
      type: Boolean,
      default: false
    },
    titleBTNGroup: {
      required: false,
      default: 'Titulo'
    },
    titleModalGroup: {
      required: false,
      default: 'titleModalGroup'
    }
  },
  components: {
    MModal
  },
  data: () => ({
    modal: false,
    modalGroup: false
  }),
  mounted() {
    this.modal = this.value
    this.modalGroup = this.value
    if (this.modal) {
      console.log('Modal Ativado')
    }
    if (this.modalGroup) {
      console.log('Modal Grupo Ativado')
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', true)
    }
  },
  watch: {
    value() {
      this.modal = this.value
    },
    modal() {
      if (this.modal) {
        this.$emit('input', this.modal)
      }
    },
    modalGroup() {
      if (this.modalGroup) {
        this.$emit('input', this.modalGroup)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#Header
  padding 17px 20px
  background #fff
  display flex
  align-items center
  border-bottom 2px solid #c4c4c4
  h4
    font-family 'Mulish'
    font-size 24px
    line-height 30px
    font-weight bold
    margin 0
    color $blueJMD
  .box-right
      display flex
      flex 1
      justify-content right
      flex-direction row-reverse
      .q-btn
        margin 5px
        font-family 'Roboto'
        font-size 12px
        text-transform capitalize
</style>
