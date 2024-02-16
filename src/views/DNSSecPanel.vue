<template>
  <button @click="toggle"
    class="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
    新增 DNSSEC 記錄
  </button>
  <div v-if="isAdding" class="w-full mt-3 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
    <div class="flex flex-col items-center sm:flex-row">
      <select v-model="flag" placeholder="選擇 Flag"
        class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option value="256">256(ZSK)</option>
        <option value="257">257(KSK)</option>
      </select>
      <select v-model="algorithm" id="domains"
        class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
      <input v-model="key" type="text"
        class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="輸入Public Key">
    </div>
    <div class="flex justify-end mt-2">
      <button @click="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
        新增
      </button>
    </div>
  </div>
  <div class="relative overflow-x-auto mt-3">
    <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 border-2 border-[#575757]">
      <thead class="text-xs text-gray-200 bg-[#575757] border-2 border-[#575757]">
        <tr>
          <th scope="col" class="px-6 py-4">
            Flag
          </th>
          <th scope="col" class="px-6 py-4">
            演算法
          </th>
          <th scope="col" class="px-6 py-4">
            公鑰
          </th>
          <th scope="col" class="px-6 py-4">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in this.records" :key="index" class="bg-white border-b">
          <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap">
            {{ record[1] }}
          </th>
          <td class="px-6 py-4">
            {{ record[2] }}
          </td>
          <td class="px-6 py-4">
            <div class="w-80 truncate">
              {{ record[3] }}
            </div>
          </td>
          <td class="px-6 py-4">
            <button class="bg-white hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded"
              @click="showInfo(record[0], record[1], record[3])">顯示</button>
            <button class="bg-white hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded"
              @click="delAlert(record[1], record[2], record[3])">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="isModalVisible" class="font-sans bg-gray-100 flex items-center justify-center">
    <div class="fixed z-10 inset-0 flex items-center justify-center">
      <div @click="onToggle" class="absolute bg-black opacity-50 inset-0 z-0"></div>
      <div class="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4">
        <div class="prose max-w-screen-md p-6"
          style="max-height: 70vh; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 0.375rem; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);">
          <h2 class="text-2xl font-bold mb-4"> DESSEC </h2>
          <h3 class="text-lg font-semibold mb-2">Flag</h3>
          <p class="mb-4">{{ info[1] }}</p>
          <h3 class="text-lg font-semibold mb-2">演算法</h3>
          <p class="mb-4">{{ info[0] }}</p>
          <h3 class="text-lg font-semibold mb-2">公鑰</h3>
          <div style="word-wrap: break-word; word-break: break-all">
            {{ info[2] }}
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 flex align-items justify-end p-4 gap-4 flex-row">
          <button @click="onToggle" type="button"
            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base bg-[#575757] border-2 border-[#575757] font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400  sm:w-auto sm:text-sm hover:bg-gray-700">
            OK </button>
        </div>
      </div>
    </div>
  </div>

  
  <div v-if="isDelete" class="font-sans bg-gray-100 flex items-center justify-center">
    <div class="fixed z-10 inset-0 flex items-center justify-center">
      <div @click="onDelete" class="absolute bg-black opacity-50 inset-0 z-0"></div>
  
      <div class="relative p-4 text-center bg-white rounded-lg   sm:p-5">
        <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        <p class="mb-4 text-gray-500 dark:text-gray-800">確定要刪除此紀錄嗎？</p>
        <div class="flex justify-center items-center space-x-4">
            <button type="button" @click="onDelete" class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base bg-[#575757] border-2 border-[#575757] font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400  sm:w-auto sm:text-sm hover:bg-gray-700">
                取消
            </button>
            <button type="submit" @click="delRecord" class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                是的，刪除！
            </button>
      </div>
      </div>
    </div>
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
      successShow: false,
      isModalVisible: false,
      info: [],
      deleKey: [],
      isDelete: false
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
        if (e.response.status == 401) {
          alert("您尚未登入！");
          window.location.href = '/login'
        }
        if (e.response.status == 403) {
          alert("您沒有權限訪問");
          window.location.href = '/domains'
        }
        if (e.response.status == 404) {
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
        await axios.post(url, data, { headers });
        alert("新增成功");
        location.reload();
      } catch (error) {
        console.error(error)
        alert(error.response.data.msg)
      }
    },
    async delAlert(flag, algorithm, key) {
      this.isDelete = true;
      this.deleKey = [flag, algorithm, key];
      return;
    },
    async delRecord() {
      const domain = this.domain.split('.').reverse().join('/');
      const url = `${baseUrl}/dnssec/${domain}/records/`;
      const data = {
        flag: this.deleKey[0],
        algorithm: this.deleKey[1],
        value: this.deleKey[2]
      };
      const headers = {
        "Authorization": `Bearer ${this.token}`
      };
      console.log(this.token)
      try {
        await axios.delete(url, { headers: headers, data: data });
        this.isDelete = false;
        this.successShow = true;
        alert("刪除成功");
        location.reload();
      } catch (error) {
        console.error(error)
        alert(error.response.data.msg)
      }
      return;
    },
    showInfo(flag, algorith, key) {
      this.info = [flag, algorith, key];
      this.onToggle();
    },
    closeDialog() {
      this.successShow = false;
      location.reload();
    },
    onToggle() {
      this.isModalVisible = !this.isModalVisible;
    }, 
    onDelete() {
      this.isDelete = !this.isDelete;
    }
  }
}

</script>
