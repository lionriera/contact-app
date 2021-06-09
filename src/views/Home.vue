<template>
  <v-app>
    <v-card tile class="overflow-hidden">
      <v-app-bar absolute color="#6A76AB" dark shrink-on-scroll prominent src="https://picsum.photos/1920/1080?random" fade-img-on-scroll scroll-target="#scrolling-techniques-3">
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
        </template>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Contact</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item v-if="this.$store.state.user.displayName">
              <v-list-item-title>{{this.$store.state.user.displayName}}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Setting</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="100vh">
        <v-container style="height: 100vh;margin-top: 230px;margin-bottom: 200px;">
          <v-tabs-items v-model="tab">
						<v-tab-item>
							<v-row v-if="load">
								<v-col v-for="(d,i) in [1,2,3,4,5,6]" v-bind:key="i" cols="12" md="4">
									<v-sheet color="grey lighten-4" class="pa-3">
										<v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
									</v-sheet>
								</v-col>
							</v-row>
							<v-row v-if="!load && this.$store.state.contact.length == 0">
								<v-col cols="12">
									<v-card elevation="2" outlined>
										<v-card-title>Contact Data Empty</v-card-title>
									</v-card>
								</v-col>
              </v-row>
              <v-row v-else>
                <v-col v-for="(d,i) in this.$store.state.contact" v-bind:key="i" cols="12" md="4">
                  <v-card elevation="2" outlined>
                    <v-card-title>{{d.firstname}}</v-card-title>
                    <v-card-subtitle>{{d.place}}</v-card-subtitle>
                    <v-card-text>
											<v-row>
												<v-col cols="12">
													<v-icon>mdi-email</v-icon> {{d.email}}
												</v-col>
												<v-col cols="12">
													<v-icon>mdi-phone</v-icon> {{d.phone}}
												</v-col>
											</v-row>
                    </v-card-text>
                    <v-card-actions>
											<div class="row justify-center" style="margin-bottom: 0;margin-top: 0px;">
												<v-btn v-if="d.pinned" @click="e => pinned(d.id)" color="blue lighten-2" text>Pinned</v-btn>
												<v-btn v-else @click="e => pinned(d.id)" color="blue lighten-2" text>Pin</v-btn>
											</div>
											<EditContact :data="d"></EditContact>
											<DeleteContact :id="d.id"></DeleteContact>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row v-if="this.$store.state.contact.length == 0">
								<v-col cols="12">
									<v-card elevation="2" outlined>
										<v-card-title>Pinned Contact Empty</v-card-title>
									</v-card>
								</v-col>
              </v-row>
              <v-row v-else>
                <v-col v-for="(d,i) in this.$store.state.contact" v-bind:key="i" cols="12" md="4">
                  <v-card v-if="d.pinned" elevation="2" outlined>
                    <v-card-title>{{d.firstname}}</v-card-title>
                    <v-card-subtitle>{{d.place}}</v-card-subtitle>
                    <v-card-text>
											<v-row>
												<v-col cols="12">
													<v-icon>mdi-email</v-icon> {{d.email}}
												</v-col>
												<v-col cols="12">
													<v-icon>mdi-phone</v-icon> {{d.phone}}
												</v-col>
											</v-row>
                    </v-card-text>
                    <v-card-actions>
											<div class="row justify-center" style="margin-bottom: 0;margin-top: 0px;">
												<v-btn v-if="d.pinned" @click="e => pinned(d.id)" color="blue lighten-2" text>Pinned</v-btn>
												<v-btn v-else @click="e => pinned(d.id)" color="blue lighten-2" text>Pin</v-btn>
											</div>
											<EditContact :data="d"></EditContact>
											<DeleteContact :id="d.id"></DeleteContact>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <AddContact></AddContact>
            </v-tab-item>
          </v-tabs-items>
          <Footer style="margin-top: 100px;"></Footer>
        </v-container>
      </v-sheet>
    </v-card>
  </v-app>
</template>
<script>
import {auth} from '@/fb'
import AddContact from '@/components/AddContact'
import EditContact from '@/components/EditContact'
import DeleteContact from '@/components/DeleteContact'
import Footer from '@/components/Footer'
export default{
  name: 'App',
  components: {
    AddContact,
    EditContact,
    DeleteContact,
    Footer
  },
  data(){
    return{
			load: true,
      drawer: false,
      group: null,
      tab: null,
      items: [
        'contact', 'pinned', 'add contact'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  watch: {
    group(){
      this.drawer = false
    },
  },
  mounted(){
    document.title = 'Home | Contact App'
		this.$store.dispatch('readContact').then(() => {
			setTimeout(() => this.load = false, 3000)
		})
  },
  methods: {
		pinned(id){
			this.$store.dispatch('pinnedContact', id)
		},
		signOut(){
			auth.signOut().then(() => this.$router.push('/login'))
		}
  }
}
</script>