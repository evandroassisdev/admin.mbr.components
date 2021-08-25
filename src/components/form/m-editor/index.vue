<template>
  <div class="container">
    <div class="partThree" v-if="step == 3">
      <q-card class="group-card">
        <label> {{title}} </label>
        <q-card class="card-editor">
          <q-editor
            v-model="qeditor"
            :dense="$q.screen.lt.md"
            :toolbar="config"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
          />
        </q-card>
      </q-card>
    </div>
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
    },
    title: {
      require: true,
      default: 'Titulo'
    }
  },
  data: () => ({
    config: {},
    pops: new Pops(),
    step: null,
    qeditor: ''
  }),
  mounted() {
    this.AlimentaConfig()
    this.step = 3
  },
  created() {
    this.pops = this.value
  },
  methods: {
    AlimentaConfig () {
      this.config = [
        [
          // {
          //   label: this.$q.lang.editor.align,
          //   icon: this.$q.iconSet.editor.align,
          //   fixedLabel: true,
          //   list: 'only-icons',
          //   options: ['left', 'center', 'right', 'justify']
          // },
          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        [
          {
            label: this.$q.lang.editor.formatting,
            icon: this.$q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: this.$q.lang.editor.fontSize,
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: this.$q.lang.editor.defaultFont,
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['undo', 'redo'],
        ['print', 'fullscreen']
      ]
    },
    registrationSteps () {
      this.step += 1
      console.log(this.step)
    },
    backRegistrationSteps () {
      this.step -= 1
      console.log(this.step)
    }
  }
}
</script>

<style lang="stylus">

</style>
