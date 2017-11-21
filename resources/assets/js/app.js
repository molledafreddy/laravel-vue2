new Vue({

	el: '#crud',
	created: function(){
		var valor = this.getKeeps();
		
	},

	data: {
		keeps: [],
 		newKeep: '',
 		fillKeep: {'id':'', 'keep':''},
 		errors: []
	},

	methods:{
		getKeeps: function(){
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data
			});
		},
		editKeep: function(keep){
			this.fillKeep.id   = keep.id;
			this.fillKeep.keep = keep.keep;
			$('#edit').modal('show');
		},
		
		updateKeep: function(id) {
			var url = 'tasks/' + id;
			axios.put(url, this.fillKeep).then(response => {
				this.getKeeps();
				this.fillKeep = {'id': '', 'keep': ''};
				this.errors	  = [];
				$('#edit').modal('hide');
				toastr.success('Tarea actualizada con éxito');
			}).catch(error => {
				this.errors = 'Corrija para poder editar con éxito'
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
				this.errors = error.response.data
			});
		}
	}
});
