
<template>
	<LogoutNavBar v-if="!isLogged" />  
	<LoggedNavBar v-if="isLogged" />  
  <router-view />
</template>

<script>

import LogoutNavBar from './components/LogoutNavBar.vue';
import LoggedNavBar from './components/LoggedNavBar.vue';

export default {
  components: {
    LogoutNavBar,
    LoggedNavBar
  },
  data() {
    return {
      isLogged: false
    }
  },
  create() {
    document.title = "NYCU-ME"
  },
  mounted() {
    this.checkLogged();
  },
  methods: {
    async checkLogged() {
      const token = Cookies.get('token');
      if(token) this.isLogged = 1;
    }
  }
}

</script>

