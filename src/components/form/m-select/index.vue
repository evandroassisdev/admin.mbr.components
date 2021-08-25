<template>
  <div id="Select">
    <ValidationProvider :rules="rules" v-slot="{ errors }" :name="label">
      <q-select
        v-model="model"
        :options="list"
        :label="label"
        :multiple="multiple"
        :emit-value="emitValue"
        :map-options="emitValue"
        :behavior="hidebehavior"
        @filter="filterFn"
        :use-input="filter"
        :option-value="campo"
        :option-label="optionlabel"
        input-debounce="0"
        :add-unique="!multiple"
        transition-show="scale"
        transition-hide="scale"
        :outlined="outlined"
        :standout="standout"
        :error="errors[0] ? true : false"
      >
        <template v-slot:prepend v-if="icon">
          <q-icon :name="icon" />
        </template>
        <template v-slot:append>
          <q-btn round dense flat v-if="iconright" :icon="iconright" />
        </template>
        <template v-slot:selected :use-chips="multiple" v-html="resultLabel">
          <div v-html="resultLabel"></div>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section avatar v-if="scope.opt.avatar || scope.opt.icon">
              <q-avatar>
                <img :src="scope.opt.avatar" alt="" v-if="scope.opt.avatar" />
                <q-icon :name="scope.opt.icon" v-else></q-icon>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:before-options v-if="multiple">
          <q-item>
            <q-btn
              v-if="multiple"
              clickable
              v-close-popup
              flat
              label="Fechar"
              color="red"
              style="width: 100%"
            />
          </q-item>
        </template>
        <template v-slot:error>
          {{ errors[0] }}
        </template>
      </q-select>
    </ValidationProvider>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      required: true
    },
    label: {
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    campo: {
      default: 'value'
    },
    controller: {
      default: null
    },
    controllerLabel: {
      default: 'name'
    },
    controllerValue: {
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    emitValue: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: false
    },
    icon: {
      default: null
    },
    iconright: {
      default: null
    },
    status: {
      type: Boolean,
      default: false
    },
    bairro: {
      type: Boolean,
      default: false
    },
    outlined: {
      default: false,
      type: Boolean
    },
    standout: {
      default: false,
      type: Boolean
    },
    options: {
      required: false,
      default: null
    },
    rules: {
      default: null
    }
  },
  data: () => ({
    model: null,
    list: [],
    complete: [],
    optionsStatus: [],
    optionsbairro: []
  }),
  mounted() {
    this.model = this.value
    this.statusOption()
    this.OptionsBairro()
    this.initialData()
  },
  methods: {
    statusOption() {
      this.optionsStatus = [
        { value: true, label: 'Ativo' },
        { value: false, label: 'Inativo' }
      ]
    },
    OptionsBairro() {
      this.optionsBairro = [
        { value: 'Bairro Planejado', label: 'Bairro Planejado' },
        {
          value: 'Bairro Planejado Fechado',
          label: 'Bairro Planejado Fechado'
        },
        { value: 'Condominio Fechado', label: 'Condominio Fechado' },
        { value: 'Resort', label: 'Resort' }
      ]
    },
    initialData() {
      if (!this.controller && this.options) {
        this.list = this.options
        this.complete = this.list
      } else if (this.controller) {
        this.getController()
      } else if (this.status) {
        this.filter = false
        this.list = this.optionsStatus
        this.complete = this.list
      } else if (this.bairro) {
        this.filter = false
        this.list = this.optionsBairro
        this.complete = this.list
      }
    },
    getController() {
      this.list = []
      this.$q.loading.show()
      this.$store.dispatch('Get', this.controller).then(resp => {
        resp.forEach(x => {
          var field = x
          if (this.controllerValue) {
            field = x[this.controllerValue]
          }
          this.list.push({
            label: x[this.controllerLabel],
            value: field
          })
        })
      })
      this.complete = this.list
      this.validateModel()
      this.$q.loading.hide()
    },
    filterFn(val, update) {
      if (val !== '' && val !== null) {
        update(
          () => {
            const needle = val.toLowerCase()
            this.list = this.complete.filter(
              v =>
                this.$functions.filters
                  .removeCaracter(v.label.toLowerCase())
                  .indexOf(this.$functions.filters.removeCaracter(needle)) > -1
            )
          },
          ref => {
            if (
              val !== '' &&
              ref.options.length > 0 &&
              ref.optionIndex === -1
            ) {
              // Add automatic value
              // if (ref.options.length === 1) {
              //   setTimeout(() => {
              //     ref.moveOptionSelection(1, true)
              //     ref.toggleOption(ref.options[ref.optionIndex], true)
              //     val = ''
              //   }, 500)
              // }
            }
          }
        )
      } else {
        update(() => {
          this.list = this.complete
        })
      }
    },
    ValidaUndefined(value, select) {
      if (value) return value
      if (select[this.controllerValue]) {
        return select[this.controllerValue]
      } else {
        if (select.value) {
          var valor = this.list.find(v => v.value === select.value)
          if (valor.label) return valor.label
        }
        valor = this.list.find(v => v.value === select)
        if (valor.label) return valor.label
      }
    },
    validateModel() {
      if (this.list.length >= 1 && this.model) {
        if (this.controllerValue) {
          alert('ok')
        }
      }
    }
  },
  computed: {
    hidebehavior() {
      if (this.filter) return 'dialog'
      else return 'menu'
    },
    optionlabel() {
      if (this.multiple) return this.controllerLabel
      else return ''
    },
    resultLabel() {
      if (this.multiple) {
        var text = ''
        if (this.model && this.model.length >= 1) {
          this.model.forEach(m => {
            text += `${this.ValidaUndefined(m[this.controllerLabel], m)}, `
          })
        }
        return text
      } else {
        if (this.model !== null && this.model !== undefined) {
          if (typeof this.model !== 'object') {
            var data = this.list.find(
              v => v.value.toString() === this.model.toString()
            )
            if (data !== null && data !== undefined) {
              if (data.label) return data.label
            }
          } else {
            var result = this.labelfunction
              ? this.labelfunction(this.model[this.controllerLabel])
              : this.model[this.controllerLabel]
            return result
          }
        }
      }
      return this.model
    }
  },
  watch: {
    list() {
      this.$emit('List', this.list)
    },
    value() {
      this.model = this.value
    },
    model() {
      this.$emit('input', this.model)
    }
  }
}
</script>
<style lang="stylus" scoped>
#Select
  padding 5px
</style>
