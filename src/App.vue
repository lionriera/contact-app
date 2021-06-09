<template>
  <router-view/>
</template>
<script>
export default{
	name: 'App',
	mounted(){
		this.$store.commit('sessionUser')
		this.$store.dispatch('readContact')
	}
}
</script>