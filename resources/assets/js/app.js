new Vue({
	el: '#crud',
	created: funciton(){
		this.geteeps();
	},
	data: {
		keeps:[]
	},
	methods:{
		getkeeps: function(){
			var urlKeeps = 'tashs';
			axios.get(urlKeeps).the(response =>{
				this.keeps = response.data
			});
		}
	}
});