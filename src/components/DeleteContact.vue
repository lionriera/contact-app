<template>
  <v-row justify="center" style="margin-bottom: 0;margin-top: 0px;">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          text
          v-bind="attrs"
          v-on="on"
        >
          Delete
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Do you want delete this contact
        </v-card-title>
        <v-card-text>Data not be recycle and data is removing permanent.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleted"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: 'DeleteContact',
  props: ['id'],
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    deleted(){
      this.$store.dispatch('deleteContact', this.$props.id).then(() => {
        this.dialog = false
      })
    }
  }
}
</script>