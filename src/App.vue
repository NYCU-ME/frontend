<template>
  <nav v-if="!isLogged">
    <LogoutNavBar/>
    <div class="m-3">
      <router-view/>
    </div>
  </nav>
  <div class="sm:flex">
    <nav v-if="isLogged">
      <LoggedNavBar v-if="isLogged" />
    </nav>
    <div class="sm:flex-1 p-3 sm:ml-32 mt-8 sm:mt-0">
      <router-view />
    </div>
  </div>
</template>

<!--
<template>
  <nav v-if="!isLogged">
    <LogoutNavBar/>
    <div class="m-3">
        <router-view />
    </div>
  </nav>
  <nav v-if="isLogged" class="sm:flex">
    <LoggedNavBar v-if="isLogged" class="flex-no-wrap fixed relative top-0 sm:flex-none" />
    <div class="sm:flex-1 m-3">
      <router-view class="w-full" />
    </div>
  </nav>
</template>
-->

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

