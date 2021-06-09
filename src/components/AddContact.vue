<template>
  <div>
    <v-alert v-if="success" type="success">{{success}}</v-alert>
    <v-card elevation="2" outlined>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="create.firstname"
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
                v-model="create.lastname"
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
                v-model="create.email"
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
                v-model="create.phone"
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
                v-model="create.place"
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
                    v-model="create.birth"
                    label="Birthday date"
                    prepend-icon="mdi-calender"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="create.birth"
                  :active-picker.sync="activePicker"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="validate"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    
  </div>
</template>
<script>
export default{
	name: 'AddContant',
	data(){
		return{
      success: null,
			create: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        place: '',
        birth: ''
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
	},
	methods: {
    validate () {
      if(this.$refs.form.validate()){
        this.$store.dispatch('addContact', this.create).then(() => {
          this.$store.commit('pushContact', this.create)
          this.create = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            place: '',
            birth: ''
          }
          this.success = 'Successfuly added contact.'
          setTimeout(() => this.success = null, 6000)
        })
      }
    },
    save(date) {
      this.$refs.menu.save(date)
    },
  }
}
</script>