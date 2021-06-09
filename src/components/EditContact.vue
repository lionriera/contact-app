<template>
  <v-row justify="center" style="margin-bottom: 0;margin-top: 0px;">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          text
          v-bind="attrs"
          v-on="on"
        >
          Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Contact</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="edit.firstname"
                    :rules="rules.firstname"
                    :counter="30"
                    label="First name"
                    prepend-icon="mdi-account"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="edit.lastname"
                    :rules="rules.lastname"
                    :counter="30"
                    label="Last name"
                    prepend-icon="mdi-account"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="edit.email"
                    :rules="rules.email"
                    label="Email"
                    prepend-icon="mdi-email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="edit.phone"
                    :rules="rules.phone"
                    :counter="20"
                    type="number"
                    label="Phone Number"
                    prepend-icon="mdi-phone"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="edit.place"
                    :rules="rules.place"
                    :counter="50"
                    label="Place"
                    prepend-icon="mdi-map-marker-outline"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="edit.birth"
                        label="Birthday date"
                        prepend-icon="mdi-calender-range"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="edit.birth"
                      :active-picker.sync="activePicker"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      :show-current="this.$props.data.birth"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="blue darken-1"
            text
            :loading="loading"
            @click="validate"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: 'EditContact',
  props: ['data', 'dakey'],
  data(){
    return{
      loader: null,
      loading: false,
      dialog: false,
      edit: {
        id: this.$props.data.id,
        firstname: this.$props.data.firstname,
        lastname: this.$props.data.lastname,
        email: this.$props.data.email,
        phone: this.$props.data.phone,
        place: this.$props.data.place,
        birth: this.$props.data.birth
      },
      valid: true,
      activePicker: null,
      date: null,
      menu: false,
      rules: {
        firstname: [
          v => !!v || 'First name is required',
          v => v.length <= 30 || 'First name must be less than 30 characters',
        ],
        lastname: [
          v => !!v || 'Last name is required',
          v => v.length <= 30 || 'Last name must be less than 30 characters',
        ],
        email: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid',
        ],
        phone: [
          v => !!v || 'Phone is required',
          v => v.length <= 20 || 'Phone must be less than 20 characters',
        ],
        place: [
          v => !!v || 'Place is required',
          v => v.length <= 50 || 'Place must be less than 50 characters',
        ],
        birth: [
          v => !!v || 'Birth is required',
        ],
      }
    }
  },
  watch: {
    menu(val){
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    },
  },
  methods: {
    validate () {
      if(this.$refs.form.validate()){
        this.$store.dispatch('updateContact', this.edit).then(() => {
          this.loader = 'loading'
          setTimeout(() => {
            this.loader = null
            this.dialog = false
          }, 2000)
        })
      }
    },
    save(date) {
      this.$refs.menu.save(date)
    },
  }
}
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>