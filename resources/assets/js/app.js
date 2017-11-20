new Vue({
	el: '#crud',
	created: function(){
		this.getkeeps();
	},
	data: {
		keeps:[]
	},
	methods:{
		getkeeps: function(){
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data
			});
		}
	}
});