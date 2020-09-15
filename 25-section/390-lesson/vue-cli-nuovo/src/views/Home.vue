<template>
	<div class="home">
		<h1>I'm a title</h1>
		<p>{{ url }}</p>
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js App"/>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'Home',
	data () {
		return {
			url: process.env.VUE_APP_URL
		}
	},
	components: {
		HelloWorld
	}
}
</script>

<style scoped lang="scss">
	div {
		.home {
			color: red;
		}
	}
</style>
