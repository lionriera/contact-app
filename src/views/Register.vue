<template>
	<v-app>
		<v-row justify="center" style="margin-top: 100px;padding: 2em;">
			<v-col cols="12" md="4">
				<v-alert v-if="error" type="error">{{error}}</v-alert>
				<v-alert v-if="success" type="success">{{success}}</v-alert>
				<v-card>
					<v-container>
						<v-card-title>Contact App Register</v-card-title>
						<v-card-text>
							<v-form ref="form" v-model="valid" lazy-validation>
								<v-row>
									<v-col cols="12" md="12">
										<v-text-field v-model="name" :rules="rules.name" :counter="30" label="Name" required></v-text-field>
									</v-col>
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
										<v-btn block :disabled="!valid" color="primary" class="mr-4" @click="validate">Register</v-btn>
									</v-col>
									<v-col cols="12">
										<p>Have a account ? <router-link to="/login">Login</router-link></p>
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
import {auth} from '@/fb'
export default{
	mounted(){
		document.title = 'Register | Contact App'
	},
	data(){
		return{
			valid: true,
			show: false,
			name: '',
			email: '',
			password: '',
			rules: {
				name: [
					v => !!v || 'Name is required',
					v => v.length <= 30 || 'Name must be less than 30 characters',
				],
				email: [
					v => !!v || 'Email is required',
					v => /.+@.+/.test(v) || 'Email must be valid',
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
			if(this.$refs.form.validate()){
				auth.createUserWithEmailAndPassword(this.email, this.password).then((res) => {
					auth.currentUser.updateProfile({displayName: this.name})
					this.$store.commit('sessionUser')
					this.success = 'Successfuly register with email ' + res.user.email + '. Please wait a moment...'
					this.$store.dispatch('addUser', res.user).then(() => {
						setTimeout(() => this.$router.push('/'), 3000)
					})
				}).catch(e => this.error = e.message)
			}
		},
	}
}
</script>