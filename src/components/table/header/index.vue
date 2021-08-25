<template>
  <div id="Header">
    <div>
      <h4>{{ title }}</h4>
    </div>
    <div class="box-right text-right">
      <div v-if="btnNew">
        <q-btn
          color="blueJMD"
          :label="titleBtnNew"
          icon="fas fa-plus"
          @click="table.actionClick = true"
        />
      </div>
      <slot name="generic"></slot>
    </div>
  </div>
</template>
<script>
import Table from '@domain/Table'
export default {
  components: {},
  props: {
    value: {
      required: true
    },
    title: {
      required: false
    },
    btnNew: {
      type: Boolean,
      required: false
    },
    titleBtnNew: {
      required: true,
      default: 'Adicione um titulo do botão'
    }
  },
  data: () => ({
    table: new Table()
  }),
  mounted() {
    this.table = this.value
  },
  watch: {
    table() {
      this.$emit('input', this.table)
    },
    value() {
      this.table = this.value
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
