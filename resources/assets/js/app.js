new Vue({

	el: '#crud',
	created: function(){
		var valor = this.getKeeps();
		
	},

	data: {
		keeps: [],
		pagination: {
			'total': 		0,
            'current_page': 0,
            'per_page': 	0,
            'last_page': 	0,
            'from': 		0,
            'to': 			0,
		},
 		newKeep: '',
 		fillKeep: {'id':'', 'keep':''},
 		errors: [],
 		offset: 3,
	},
	computed: {
		//retorna lapagina en la cual esta posicionado
		isActived: function(){
			return this.pagination.current_page;
		},
		//verifica si es necesario mostrar un numero determinado de paginas
		pagesNumber: function(){
			if(!this.pagination.to){
				return [];
			}

			var from = this.pagination.current_page - this.offset;
			if (from < 1) {
				from = 1;
			}

			var to = from + (this.offset * 2);
			if (to >= this.pagination.last_page) {
				to = this.pagination.last_page;
			}
			//calcula la numeracion exacta
			var pagesArray = [];
			while(from <= to){
				pagesArray.push(from);
				from++;
			}
			return pagesArray;
		}
	},

	methods:{
		getKeeps: function(page){
			var urlKeeps = 'tasks?page='+page;
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data.tasks.data,
				this.pagination = response.data.pagination	
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
		},

		changePage: function(page) {
			this.pagination.current_page = page;
			this.getKeeps(page);
		}
	}
});
