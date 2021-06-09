import Vue from 'vue'
import Vuex from 'vuex'

import {auth, db} from '@/fb'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {},
		contact: []
	},
	mutations: {
		sessionUser(state){
			state.user = auth.currentUser
			auth.onAuthStateChanged((user) => {
				state.user = user
			})
		},
		pushContact(state, data){
			state.contact.push(data)
		},
	},
	actions: {
		addUser({state}, data){
			return db.collection('user').doc(state.user.uid).set({
				id: data.uid,
				name: data.displayName,
				email: data.email,
				photoURL: data.photoURL,
			})
		},
		addContact({state}, data){
			const contact = db.collection('user').doc(state.user.uid).collection('contact').doc()
			return contact.set({
				id: contact.id,
				firstname: data.firstname,
				lastname: data.lastname,
				email: data.email,
				phone: data.phone,
				place: data.place,
				birth: data.birth,
			})
		},
		updateContact({state}, data){
			const contact = db.collection('user').doc(state.user.uid).collection('contact').doc(data.id)
			var update = state.contact.map((d) => {
				if(d.id == data.id){
					d = data
				}
				return d
			})
			if(update){
				state.contact = update
				return contact.update({
					id: contact.id,
					firstname: data.firstname,
					lastname: data.lastname,
					email: data.email,
					phone: data.phone,
					place: data.place,
					birth: data.birth,
				})
			}
		},
		readContact({state}){
			db.collection('user').doc(state.user.uid).collection('contact').get().then((snap) => {
				snap.forEach((d) => state.contact.push(d.data()))
			})
			return new Promise((res) => {
				res('success')
			})
		},
		deleteContact({state}, id){
			state.contact = state.contact.filter((d) => d.id !== id)
			return db.collection('user').doc(state.user.uid).collection('contact').doc(id).delete()
		},
		pinnedContact({state}, id){
			let pinned = false
			state.contact = state.contact.map((d) => {
				if(d.id == id){
					if(d.pinned){
						d.pinned = false
						pinned = false
					}else{
						d.pinned = true
						pinned = true
					}
				}
				return d
			})
			return db.collection('user').doc(state.user.uid).collection('contact').doc(id).update({pinned: pinned})
		}
  },
  modules: {
  }
})
