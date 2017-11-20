new Vue({
	el: '#crud',
	created: function(){
		this.getKeeps();
	},
	data: {
		keeps: [],
 +		newKeep: '',
 +		errors: []
	},
	methods:{
		getKeeps: function(){
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data
			});
		},
		deleteKeep: function(keep){
			var url = 'tasks/' + keep.id; //concatena el id  a la ruta
			axios.delete(url).then(response =>{//eliminamos el registro
				this.getKeeps();//listamos
				toastr.success('Eliminado correctamente');//enviamos la notificacion
			});
		},
		createKeep: function(){
			var url = 'tasks';
			//captura la ruta y los parametros que va a insertar
			axios.post(url, {

				keep: this.newKeep

			}).then(response =>	{
				//consulta todos los registros de la bd
				this.getKeeps();
				//limpia el campo 
				this.newKeep = '';
				//limpia los errores
				this.errors = [];
				//quita el modal de la ventana
				$('#create').modal('hide');
				toastr.success('Nueva tarea creada con éxito');
				//catch captura los errores
			}).catch(error => {
				this.erros = error.response.data
			});
		}
	}
});
