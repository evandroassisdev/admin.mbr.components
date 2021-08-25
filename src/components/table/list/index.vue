<template>
  <div id="List">
    <m-data v-model="table" :List="List" />
  </div>
</template>
<script>
import { Loading } from 'quasar'
import Table from '@domain/Table'
import MData from './table'
export default {
  props: {
    value: {
      required: true
    }
  },
  components: {
    MData
  },
  data: () => ({
    table: new Table(),
    registros: []
  }),
  mounted() {
    this.table = this.value
    this.loadData()
  },
  methods: {
    loadData() {
      Loading.show()
      this.$store.dispatch('Get', this.table.controller).then(resp => {
        if (this.table.template) {
          this.table.manualData = resp
        } else {
          this.registros = resp
        }
      })
      Loading.hide()
    }
  },
  computed: {
    List() {
      return this.registros
    }
  },
  watch: {
    'table.actionClick'() {
      if (!this.table.actionClick) {
        this.table.reflesh = true
      }
    },
    'table.reflesh'() {
      if (this.table.reflesh) {
        this.loadData()
        this.table.select = {}
        this.table.selects = []
        this.table.reflesh = false
        this.table.actionClick = false
      }
    },
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
