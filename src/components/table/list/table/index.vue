<template>
  <div id="Dados" v-if="!table.template">
    <q-table
      :data="List"
      :columns="table.fields"
      row-key="name"
      selection="multiple"
      :pagination="pagination"
      :selected.sync="selected"
    >
      <template v-slot:top v-if="table.activeSelect">
        <div class="header-top">
          <q-btn
            @mouseover="setIcon('delete_sweep')"
            @mouseleave="setIcon('delete')"
            flat
            label="Deletar Selecionados"
            :icon="icon"
            color="red"
            @click="removeValue()"
            v-if="table.selects.length >= 1"
          />
        </div>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props" class="header-table-tr">
          <q-th v-if="table.activeSelect">
            <q-checkbox v-model="props.selected" />
          </q-th>
          <q-th
            v-for="c in props.cols"
            :key="c.name"
            :props="props"
            class="th-field"
          >
            {{ c.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" class="body-table-tr">
          <q-td
            class="text-center"
            style="padding-left: 17px"
            v-if="table.activeSelect"
          >
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td v-for="(f, index) in table.fields" :key="f.name">
            <div class="td-container">
              <div
                class="td-copy"
                @click="Copy(props.row[f.field])"
                v-if="f.copy"
              >
                <q-icon size="12px" name="fas fa-copy" />
              </div>
              <div :class="`td-field td-field-${index}`">
                <label>{{ formatValue(f, props.row[f.field]) }}</label>
                <q-popup-edit v-model="props.row[f.field]" v-if="f.editPopup">
                  <q-input
                    v-model="props.row[f.field]"
                    dense
                    autofocus
                    @keyup.enter="editPopup(props.row)"
                  />
                </q-popup-edit>
              </div>
              <div v-if="f.actionButton" class="td-buttons">
                <div>
                  <q-btn
                    round
                    flat
                    :icon="f.iconEdit ? f.iconEdit : 'edit'"
                    @click="editValue(props.row)"
                  />
                </div>
                <div>
                  <q-btn
                    round
                    flat
                    icon="delete"
                    @click="removeValue(props.row)"
                    :disable="table.selects.length >= 1"
                  />
                </div>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="last_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
      </template>
    </q-table>
    <m-modal v-model="edit"> {{ table.select }} </m-modal>
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
    List: {
      required: true
    }
  },
  data: () => ({
    table: new Table(),
    edit: false,
    selected: [],
    icon: 'delete',
    pagination: {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 25
    }
  }),
  mounted() {
    this.table = this.value
  },
  computed: {},
  methods: {
    editPopup(data) {
      this.$store
        .dispatch('Put', {
          endereco: `/${this.table.controller}/${data.id}`,
          data: data
        })
        .then(resp => {
          this.table.reflesh = true
        })
        .catch(() => {
          this.table.reflesh = true
        })
    },
    setIcon(icon) {
      this.icon = icon
    },
    formatValue(field, value) {
      if (field.format) {
        var result = field.format(value)
        return result
      } else {
        result = value
        if (field.date) {
          result = this.$functions.filters.DataFormatBR(value)
        }
        if (field.datetime) {
          result = this.$functions.filters.DataTimeDDMMYY(value)
        }
        return result
      }
    },
    Copy(value) {
      this.$functions.Copy(value)
    },
    editValue(value) {
      this.table.select = value
      this.table.actionClick = true
    },
    removeValue(value) {
      this.$q
        .dialog({
          title: 'Atenção',
          message: 'Tem certeza que deseja remover o(s) dado(s) selecionado(s)',
          cancel: true,
          persistent: true,
          color: 'red',
          position: 'left'
        })
        .onOk(() => {
          if (this.table.selects.length < 1) {
            this.table.select = value
            this.Remove()
          } else {
            this.RemoveAll()
          }
        })
        .onCancel(() => {
          this.table.select = {}
        })
    },
    Remove() {
      console.log('1')
      // this.$q.loading.show()
      this.table.reflesh = false
      this.selected = []
      this.$store
        .dispatch('Delete', `/${this.table.controller}/${this.table.select.id}`)
        .then(resp => {
          this.table.select = {}
          this.table.selects = []
          this.$q.loading.hide()
          // this.$message.MessageForm(resp.message, resp.success)
          if (resp.success) {
            this.table.reflesh = true
          }
        })
    },
    RemoveAll() {
      // this.$q.loading.show()
      this.table.reflesh = false
      this.$store
        .dispatch('DeleteAll', {
          endereco: this.table.controller,
          data: this.table.selects
        })
        .then(resp => {
          this.table.select = {}
          this.table.selects = []
          this.selected = []
          this.$q.loading.hide()
          // this.$message.MessageForm(resp.message, resp.success)
          if (resp.success) {
            this.table.reflesh = true
          }
        })
    }
  },
  watch: {
    value() {
      this.table = this.value
    },
    table() {
      this.$emit('input', this.table)
    },
    selected() {
      this.table.selects = this.selected
    }
  }
}
</script>
<style lang="stylus" scoped>
#Dados
  padding 25px
  .header-top
    // padding-left 17px
  .header-table-tr
    .th-field
      padding-left 32px
  .body-table-tr
    .q-td
      padding-left: 32px
    .td-container
      display flex
      justify-content space-between
      align-items center
      // padding 20px 0
    .td-copy
      margin-right 5px
      .q-icon
        color #C2CFE0
        transition 0.2s
        cursor pointer
      .q-icon:hover
        color $primary
    .td-field
      flex 1
    .td-field-0
      label
        font-family "Poppins"
        font-size 15px
        color #323C47
        font-weight 500
        line-height 22px
    .td-buttons
      display flex
      flex-direction row
      .q-btn
        font-size 12px
        color #C2CFE0
        transition 0.3s
      .q-btn:hover
        cursor pointer
        color: $blueJMD
</style>
