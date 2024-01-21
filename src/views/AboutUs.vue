<template>
    <div class="flex flex-col justify-center items-center w-full">
        <div>
            <a href="https://github.com/LeeLin2602">
                <div class="block flex max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <div class="flex-none">
                        <img class="mx-auto w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]" src="https://avatars.githubusercontent.com/u/30391069?v=4">
                    </div>
                    <div class="flex-1 px-5">
                        <p>專案發起者</p>
                        <hr/>
                        <p>前端開發</p>
                        <p>後端開發</p>
                        <p>伺服器維運</p>
                        <p>DevOps</p>
                    </div>
                </div>
            </a>
        </div>
        <div class="m-3">
            <a href="https://github.com/wdzeng">
                <div class="block flex max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <div class="flex-none">
                        <img class="mx-auto w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]" src="https://avatars.githubusercontent.com/u/39057640?v=4">
                    </div>
                    <div class="flex-1 px-5">
                        <p>共同發起者</p>
                        <p>網域贊助者</p>
                    </div>
                </div>
            </a>
        </div>
        <hr/>
    </div>
    <hr/>
	<div class="p-16">
		<div class="flex justify-center ">
      <div class="max-w-sm  w-full bg-white shadow-lg rounded-lg overflow-hidden my-4 ">
        <div class="flex items-center px-6 py-3 bg-[#575757]">
          <h1 class="mx-3 text-white font-semibold text-lg">感謝以下貢獻者：</h1>
        </div>
        <div class="py-4 px-6">
          <li v-for="name in contributor_list" class="font-semibold text-gray">{{ name }}</li>

        </div>
      </div>
    </div>
  </div>    
	
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      contributor_list: [],
    }
  },
  created() {
    this.getContributors();
  },
  methods: {
    async getContributors() {
      try {
        const apiServerResponse = await axios.get('https://api.github.com/repos/NYCU-ME/backend-flask-server/pulls?state=closed');
        const backendResponse = await axios.get('https://api.github.com/repos/NYCU-ME/backend/pulls?state=closed');
        const frontendResponse = await axios.get('https://api.github.com/repos/NYCU-ME/frontend/pulls?state=closed');
        const contributorsResponse = await axios.get('https://api.github.com/repos/NYCU-ME/contributors/pulls?state=closed');


        // Concatenate contributors from all sources
        const contributor_list = apiServerResponse['data'].concat(backendResponse['data']).concat(frontendResponse['data']).concat(contributorsResponse['data']);
        
				for(let i = 0; i < contributor_list.length; i++) {
          if(contributor_list[i]['merged_at'] != null)
						this.contributor_list.push(contributor_list[i]['user']['login'])
				}
				const unique = arr => [...new Set(arr)];
        this.contributor_list = unique(this.contributor_list);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    },
  }
}
</script>

