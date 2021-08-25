<template>
  <div id="Input">
    <ValidationProvider :rules="rules" v-slot="{ errors }" :name="label">
      <q-input
        v-model="model"
        :label="label"
        :filled="filled"
        :outlined="outlined"
        :standout="standout"
        :borderless="borderless"
        :rounded="rounded"
        :square="square"
        :color="color"
        :bg-color="bgColor"
        :placeholder="placeholder"
        :label-color="labelColor"
        :type="typeCamp"
        :dense="dense"
        :mask="mask"
        :error="errors[0] ? true : false"
      >
        <template v-slot:prepend v-if="icon">
          <q-icon size="16px" :name="icon" :autofocus="autofocus" />
        </template>
        <template v-slot:append>
          <q-icon
            name="fas fa-times"
            size="15px"
            v-if="close && model"
            @click="model = null"
            class="cursor-pointer"
          />
          <q-btn round dense flat v-if="iconright" :icon="iconright" />
          <q-icon
            v-if="type == 'password' && model"
            :name="isPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"
            class="cursor-pointer"
            size="15px"
            @click="isPwd = !isPwd"
          />
        </template>
        <template v-slot:error>
          {{ errors[0] }}
        </template>
      </q-input>
    </ValidationProvider>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      required: true
    },
    close: {
      default: true,
      type: Boolean
    },
    label: {
      default: ''
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
    color: {
      default: 'standard',
      type: String
    },
    bgColor: {
      default: 'white',
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
    dense: {
      default: false,
      type: Boolean
    },
    labelColor: {
      default: '',
      type: String
    },
    mask: {
      default: '',
      type: String
    },
    error: {
      default: null
    },
    type: {
      default: 'text'
    },
    rules: {
      default: null
    }
  },
  components: {},
  data: () => ({
    model: null,
    isPwd: true
  }),
  mounted() {
    this.model = this.value
  },
  computed: {
    typeCamp() {
      if (this.type === 'password') {
        if (this.isPwd) return 'password'
        else return 'text'
      } else if (this.type === 'color') {
        return 'text'
      } else {
        return this.type
      }
    }
  },
  methods: {},
  watch: {
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
#Input
  padding 5px
</style>
