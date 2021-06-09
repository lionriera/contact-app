<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-1 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0">
        Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Totam animi, 
        fuga dolores sit tempore asperiores veritatis necessitatibus, inventore. 
        Quos dolorum doloribus perferendis libero ipsam, debitis fugit excepturi 
        odio autem tempora!
        Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Totam animi, 
        fuga dolores sit tempore asperiores veritatis necessitatibus, inventore. 
        Quos dolorum doloribus perferendis libero ipsam, debitis fugit excepturi 
        odio autem tempora!
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>ferdiansyah0611</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data(){
      return{
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }
    }
  }
</script>