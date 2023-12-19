<template>
  <nav v-if="!isLogged">
    <LogoutNavBar/>
    <div class="m-3">
      <router-view/>
    </div>
  </nav>
  <div class="sm:flex" v-if="isLogged">
    <nav>
      <LoggedNavBar />
    </nav>
    <div class="sm:flex-1 p-3 sm:ml-32 mt-8 sm:mt-0">
      <router-view />
    </div>
  </div>
</template>

<script>

import LogoutNavBar from './components/LogoutNavBar.vue';
import LoggedNavBar from './components/LoggedNavBar.vue';

import Cookies from 'js-cookie';

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
      if(token) this.isLogged = true;
    }
  }
}

</script>

