<template>
  <div id="Select">
    <ValidationProvider :rules="rules" v-slot="{ errors }" :name="label">
      {{ list }}
      <q-select
        v-model="model"
        :options="list"
        :label="label"
        :stack-label="stack"
        :hint="hint"
        :hide-hint="hidehint"
        :prefix="prefix"
        :suffix="suffix"
        :clearable="clearable"
        :color="color"
        :bg-color="bgColor"
        :placeholder="placeholder"
        :label-color="labelColor"
        :filled="filled"
        :outlined="outlined"
        :standout="standout"
        :borderless="borderless"
        :rounded="rounded"
        :square="square"
        transition-show="scale"
        transition-hide="scale"
        :use-input="filter"
        :behavior="hidebehavior"
        :multiple="multiple"
        :emit-value="emitValue"
        :map-options="emitValue"
        @filter="filterFn"
        :option-value="campo"
        :option-label="optionlabel"
        :error="errors[0] ? true : false"
        input-debounce="0"
        :add-unique="!multiple"
      >
        <template v-slot:selected :use-chips="multiple" v-html="resultLabel">
          <div v-html="resultLabel"></div>
        </template>
        <template v-slot:prepend v-if="icon">
          <q-icon :name="icon" :autofocus="autofocus" />
        </template>
        <template v-slot:append>
          <q-btn round dense flat v-if="iconright" :icon="iconright" />
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
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Nenhum registro encontrado!
            </q-item-section>
          </q-item>
          <q-item>
            <q-btn
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
    campo: {
      default: 'value'
    },
    label: {
      default: ''
    },
    stack: {
      type: Boolean,
      default: false
    },
    hint: {
      default: null
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    color: {
      default: 'standard',
      type: String
    },
    bgColor: {
      default: 'white',
      type: String
    },
    labelColor: {
      default: '',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    },
    icon: {
      default: null
    },
    iconright: {
      default: null
    },
    autofocus: {
      default: false,
      type: Boolean
    },
    filled: {
      default: false,
      type: Boolean
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
    borderless: {
      default: false,
      type: Boolean
    },
    rounded: {
      default: false,
      type: Boolean
    },
    square: {
      default: false,
      type: Boolean
    },
    close: {
      default: true,
      type: Boolean
    },
    filter: {
      type: Boolean,
      default: false
    },
    behavior: {
      type: String,
      default: 'dialog'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    emitValue: {
      type: Boolean,
      default: false
    },
    typeBairro: {
      type: Boolean,
      default: false
    },
    typeLocation: {
      type: Boolean,
      default: false
    },
    error: {
      default: null
    },
    controller: {
      default: null
    },
    status: {
      type: Boolean,
      default: false
    },
    controllerLabel: {
      default: 'name'
    },
    controllerValue: {
      default: null
    },
    validateCamp: {
      default: 'id'
    },
    avatarOption: {
      default: null
    },
    labelfunction: {
      default: null
    },
    rules: {
      default: null
    }
  },
  components: {},
  data: () => ({
    model: null,
    list: [],
    complete: [],
    optionsStatus: []
  }),
  mounted() {
    this.model = this.value
    this.statusOption()
    this.initialData()
  },
  computed: {
    hidehint() {
      if (this.hint !== null) return true
      else return false
    },
    hidebehavior() {
      if (this.filter) return this.behavior
      else return 'menu'
    },
    // eslint-disable-next-line vue/return-in-computed-property
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
            // console.log(result)
            return result
          }
        }
        return this.model
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    optionlabel() {
      if (this.multiple) return this.controllerLabel
    }
  },
  methods: {
    statusOption() {
      this.optionsStatus = [
        { value: true, label: 'Ativo' },
        { value: false, label: 'Inativo' }
      ]
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
        return ''
      }
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
    initialData() {
      if (!this.controller && this.options) {
        this.list = this.options
        this.complete = this.list
      } else if (this.controller) {
        this.getController()
      } else if (this.status) {
        this.nosearch = false
        this.list = this.optionsStatus
        this.complete = this.list
      }
    },
    validateModel() {
      if (this.list.length >= 1 && this.model) {
        if (!this.multiple) {
          if (this.controllerValue) {
            if (!this.list.find(x => x.value === this.model)) {
              this.model = null
            }
          } else {
            if (
              !this.list.find(
                x =>
                  x.value[this.validateCamp] === this.model[this.validateCamp]
              )
            ) {
              this.model = null
            } else {
              return this.list.find(
                x =>
                  x.value[this.validateCamp] === this.model[this.validateCamp]
              )
            }
            if (!this.list.find(x => x.value === this.model)) {
              this.model = null
            }
          }
        } else {
          var lista = this.model
          if (lista) {
            lista.forEach(l => {
              if (
                this.model.filter(
                  f => f[this.validateCamp] === l[this.validateCamp]
                ).length >= 2
              ) {
                this.model.splice(
                  this.model.findIndex(
                    f => f[this.validateCamp] === l[this.validateCamp]
                  ),
                  1
                )
              }
            })
          }
        }
      }
      this.$q.loading.hide()
    },
    getController() {
      this.list = []
      this.$q.loading.show()
      this.$store.dispatch('Get', this.controller).then(resp => {
        if (resp) {
          resp.forEach(x => {
            var field = x
            if (this.controllerValue) {
              field = x[this.controllerValue]
            }
            var avatarIcon = null
            if (this.avatarOption) {
              if (this.avatarOption.indexOf('.') >= 1) {
                var item = null
                this.avatarOption.split('.').forEach(camp => {
                  if (!item) {
                    item = x[camp]
                  } else {
                    item = item[camp]
                  }
                })
                avatarIcon = item
              } else {
                avatarIcon = x[this.avatarOption]
              }
            }
            if (!this.labelfunction) {
              this.list.push({
                label: x[this.controllerLabel],
                value: field,
                avatar: avatarIcon
              })
            } else {
              this.list.push({
                label: this.labelfunction(x[this.controllerLabel]),
                value: field,
                avatar: avatarIcon
              })
            }
          })
        }
        this.complete = this.list
        this.validateModel()
        this.$q.loading.hide()
      })
    }
  },
  watch: {
    list() {
      this.$emit('List', this.list)
    },
    value() {
      this.model = this.value
      this.validateModel()
    },
    model() {
      this.validateModel()
      this.$emit('input', this.model)
    }
  }
}
</script>
<style lang="stylus" scoped>
#Select
  padding 5px
</style>
