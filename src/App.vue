<template>
  <nav v-if="!isLogged">
    <LogoutNavBar/>
    <div class="m-3">
        <router-view />
    </div>
  </nav>
  <nav v-if="isLogged" class="sm:flex">
    <LoggedNavBar v-if="isLogged" class="sm:flex-none" />
    <div class="sm:flex-1 m-3">
      <router-view class="w-full" />
    </div>
  </nav>
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

