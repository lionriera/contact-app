<template>
	<v-app>
		<v-row justify="center" style="margin-top: 100px;padding: 2em;">
			<v-col cols="12" md="4">
				<v-alert v-if="error" type="error">{{error}}</v-alert>
				<v-alert v-if="success" type="success">{{success}}</v-alert>
				<v-card>
					<v-container>
						<v-card-title>Contact App Login</v-card-title>
						<v-card-text>
							<v-form ref="form" v-model="valid" lazy-validation>
								<v-row>
									<v-col cols="12" md="12">
										<v-text-field
											v-model="email"
											:rules="rules.email"
											:counter="25"
											label="Email"
											required
										></v-text-field>
									</v-col>
									<v-col cols="12" md="12">
										<v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="rules.password" :type="show ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show = !show"></v-text-field>
									</v-col>
									<v-col cols="12" md="12">
										<v-btn block :disabled="!valid" color="primary" class="mr-4" @click="validate">Login</v-btn>
									</v-col>
									<v-col cols="12" style="text-align: center;">
										<v-row justify="center">
											<v-col cols="6">
												<v-btn @click="google" color="primary" class="mx-4 white--text" icon>
													<v-icon size="24px">mdi-google</v-icon>
												</v-btn>
											</v-col>
											<v-col @click="facebook" cols="6">
												<v-btn color="primary" class="mx-4 white--text" icon>
													<v-icon size="24px">mdi-facebook</v-icon>
												</v-btn>
											</v-col>
										</v-row>
									</v-col>
								</v-row>
							</v-form>
						</v-card-text>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-app>
</template>
<script>
import {auth, firebase} from '@/fb'
export default{
	mounted(){
		document.title = 'Login | Contact App'
	},
	data(){
		return{
			valid: true,
			show: false,
			email: '',
			password: '',
			rules: {
				email: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test(v) || 'E-mail must be valid',
				],
				password: [
					v => !!v || 'Password is required',
					v => v.length <= 10 || 'Password must be less than 10 characters',
				],
			},
			success: null,
			error: null
		}
	},
	methods: {
		validate() {
      this.$refs.form.validate()
    },
    facebook(e){
			e.preventDefault()
			let provider = new firebase.auth.FacebookAuthProvider()
			auth.signInWithPopup(provider).then((res) => {
				this.$store.commit('sessionUser')
				this.success = 'Successfuly login with email ' + res.user.email + '. Please wait a moment...'
				this.$store.dispatch('addUser', res.user).then(() => {
					setTimeout(() => this.$router.push('/'), 3000)
				})
			}).catch(e => this.error = e.message)
		},
		google(e){
			e.preventDefault()
			let provider = new firebase.auth.GoogleAuthProvider()
			auth.signInWithPopup(provider).then((res) => {
				this.$store.commit('sessionUser')
				this.success = 'Successfuly login with email ' + res.user.email + '. Please wait a moment...'
				this.$store.dispatch('addUser', res.user).then(() => {
					setTimeout(() => this.$router.push('/'), 3000)
				})
			}).catch(e => this.error = e.message)
		},
	}
}
</script>