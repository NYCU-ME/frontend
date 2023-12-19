<template>
    <div>
        <button @click="toggle" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            註冊新網域
        </button>
    </div>
    <div v-if="isRegistering" class="w-full mt-3 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div class="flex flex-col items-center sm:flex-row">
            <input v-model="subdomain" type="text" class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="輸入子網域">
            <select v-model="domain" id="domains" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option v-for="domain in hostedDomains" :value="domain">.{{ domain }}</option>
            </select>
        </div>
        <div class="flex justify-end mt-2">
            <button @click="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                註冊
            </button>
        </div>
    </div>
	<hr v-if="isRegistering" class="m-2"/>

	<div class="grid grid-cols-1 md:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-4">
		<div v-for="domain in domains" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mt-3">
			<a :href="`/domain?id=${domain.id}`">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ domain.domain }}</h5>
				<p class="font-normal text-gray-700 text-right">{{ domain.expDate }}</p>
			</a>
		</div>
	</div>
</template>


<script>
import axios from 'axios';
import Cookies from 'js-cookie';

const hostedDomains = import.meta.env.VITE_HOSTED_DOMAINS;

export default {
  data() {
    return {
      isRegistering: false,
	  hostedDomains: [],
      domains: [],
	  domain: "",
	  subdomain: ""
    }
  },
  mounted() {
	this.hostedDomains = hostedDomains.split(',')
    const token = Cookies.get('token')
    if (!token) {
      alert("還並未登入。")
      window.location.href = '/'
    } else {
      this.getProfile(token)
    }
  },
  methods: {
    toggle() {
      this.isRegistering = !this.isRegistering
    },
    async getProfile(token) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL
      try {
        const response = await axios.get(`${baseUrl}/whoami/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = response.data
        this.domains = data.domains
        console.log(this.domains)
      } catch (error) {
        console.error(error)
		if(response.status == 401) {
			Cookies.remove('token');
			alert("您尚未登入！");
			window.location.href = '/login'
		}
      }
    },
    async submit() {
      const baseUrl = import.meta.env.VITE_API_BASE_URL
      const hosted_domain_string = this.domain.split('.').reverse().join('/')
      const url = `${baseUrl}/domains/${hosted_domain_string}/${this.subdomain}`
      const token = Cookies.get('token');
	  try {
          await axios.post(url, {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          alert("新增成功！")
          location.reload()
       } catch (error) {
          console.log(error)
          alert(error.response.data.msg)
       }
    }	
  }
}
</script>

