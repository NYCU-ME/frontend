<template>
  <button @click="toggle" class="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
    新增 DNSSEC 記錄
  </button>
  <div v-if="isAdding" class="w-full mt-3 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
    <div class="flex flex-col items-center sm:flex-row">
        <select v-model="flag" placeholder="選擇 Flag" class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"> 
          <option value="256">256(ZSK)</option>
          <option value="257">257(KSK)</option>
        </select>
        <select v-model="algorithm" id="domains" class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="2">2 (Diffie-Hellman)</option>
            <option value="3">3 (DSA/SHA1)</option>
            <option value="5">5 (RSA/SHA-1)</option>
            <option value="6">6 (DSA-NSEC3-SHA1)</option>
            <option value="7">7 (RSASHA1-NSEC3-SHA1)</option>
            <option value="8">8 (RSA/SHA-256)</option>
            <option value="10">10 (RSA/SHA-512)</option>
            <option value="12">12 (GOST R 34.10-2001)</option>
            <option value="13">13 (ECDSA Curve P-256 with SHA-256)</option>
            <option value="14">14 (ECDSA Curve P-384 with SHA-384)</option>
            <option value="15">15 (Ed25519)</option>
            <option value="16">16 (Ed448)</option>
            <option value="253">253 (Private algorithm)</option>
            <option value="254">254 (Private algorithm OID)</option>
        </select>
        <input v-model="key" type="text" class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="輸入Public Key">
    </div>
    <div class="flex justify-end mt-2">
      <button @click="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
        新增
      </button>
    </div>
  </div>
  <div class="relative overflow-x-auto mt-3">
		<table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 border-2 border-[#575757]">
			<thead class="text-xs text-gray-200 bg-[#575757] border-2 border-[#575757]" >
				<tr>
					<th scope="col" class="px-6 py-3">
						Flag
					</th>
					<th scope="col" class="px-6 py-3">
            演算法
					</th>
					<th scope="col" class="px-6 py-3">
						公鑰
					</th>
          <th scope="col" class="px-6 py-3">
            顯示
          </th> 
          <th scope="col" class="px-6 py-3">
            操作
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(record, index) in this.records" :key="index" class="bg-white border-b">
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
						{{  record[1] }}
					</th>
					<td class="px-6 py-4" >
						{{ record[2] }}
					</td>
					<td class="px-6 py-4" >
            <div style="width:400px;overflow:hidden;" nowrap>
              {{ record[3] }}
            </div>
					</td>
          <td class="px-6 py-4"><button @click="showKey(record[3])">顯示</button></td>
					<td class="px-6 py-4"><button @click="delRecord(record[1], record[2], record[3])">刪除</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import SuccessDialog from '../components/dialog/SuccessDialog.vue';

const baseUrl = import.meta.env.VITE_API_BASE_URL

export default {
  data() {
    return {
      id: 0,
	    isAdding: false,
      algorithm: "2",
      records: [],
      flag: "256",
      subdomain: '@',
      ttl: 5,
	    token: "",
      key: "",
      domain: "",
      successShow: false
    }
  },
  components: {
    SuccessDialog
  },
  created() {
    this.token = Cookies.get('token');
    this.id = this.$route.query.id;
    if (!this.token) {
      Cookies.remove('token');
      alert("您尚未登入。");
      window.location.href = '/login';
    } else {
      this.getProfile(this.token);
    }
  },
  methods: {
    toggle() {
        this.isAdding = !this.isAdding;
    },
    async getProfile(token) {
      try {
        const response = await axios.get(`${baseUrl}/domain/${this.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.domain = response.data.domain.domain
        this.records = response.data.domain.records
        this.glues = response.data.domain.glues
        this.records = response.data.domain.dnskeys
      } catch (e) {
        if(e.response.status == 401) {
          alert("您尚未登入！");
          window.location.href = '/login'
        }
        if(e.response.status == 403) {
          alert("您沒有權限訪問");
          window.location.href = '/domains'
        }
        if(e.response.status == 404) {
          alert("記錄不存在！");
          window.location.href = '/domains'
        }
      }
    },
    async submit() {
      console.log(this.flag, this.algorithm, this.key);
      // todo
      const domain = this.domain.split('.').reverse().join('/');
      const url = `${baseUrl}/dnssec/${domain}/records/`;
      console.log(url);
      const data = {
        flag: this.flag,
        algorithm: this.algorithm,
        value: this.key,
        ttl: 5
      }
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      };
      try {
        await axios.post(url, data, { headers});
        alert("新增成功");
        location.reload();
      } catch (error) {
        console.error(error)
        alert(error.response.data.msg)
      }
		},
    async delRecord(flag, algorithm, key) {
      const domain = this.domain.split('.').reverse().join('/');
      const url = `${baseUrl}/dnssec/${domain}/records/`;
      const data = {
        flag: flag,
        algorithm: algorithm,
        value: key
      }
      const headers = {
        "Authorization": `Bearer ${this.token}`
      };
      console.log(this.token)
      try {
        await axios.delete(url, {headers: headers, data: data});
        this.successShow = true;
        alert("刪除成功");
        location.reload();
      } catch (error) {
        console.error(error)
        alert(error.response.data.msg)
      }
      return;
    },
    showKey(key) {
      alert('Public Key: ' + key)
    },
    closeDialog() {
      this.successShow = false;
      location.reload();
    }
  }
}

</script>
