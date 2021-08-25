<template>
  <div id="Table">
    <m-header
      v-model="table"
      :title="title"
      :btnNew="btnNew"
      :titleBtnNew="titleBtnNew"
    >
      <template slot="generic">
        <slot name="bntTemplates"></slot>
      </template>
    </m-header>
    <m-list v-model="table" />
  </div>
</template>
<script>
import Table from '@domain/Table'
import MHeader from './header'
import MList from './list'
export default {
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
  components: {
    MHeader,
    MList
  },
  data: () => ({
    table: new Table(),
    records: []
  }),
  mounted() {
    this.table = this.value
  },
  created() {
    this.table = this.value
  },
  methods: {},
  computed: {},
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
<style lang="stylus" scoped></style>
