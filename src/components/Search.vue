<template>
  <div>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      return-object
      item-text="firstname"
      hide-details
      label="Search contact"
      solo-inverted></v-autocomplete>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,
        states: this.$store.state.contact
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections(v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.$store.state.contact.filter(e => {
            return (e.firstname || e.lastname || e.email || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
    },
  }
</script>