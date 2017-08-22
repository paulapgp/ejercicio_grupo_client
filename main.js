  var app = new Vue({
  		el: '#maestro',
    		data: {
      		selected: '',
      		personas: [],
          personaPost : {nombre: '', apellido: '', edad: '' },
          personaDetalle: {id: '', nombre: '', pellido: '', edad: ''}
      	},
        
        methods: {

          mostrarDetalles: function(id)
          {

            var _this = this;
            $.ajax(
            {
              url : "http://10.60.23.12:50292/api/Personas/"+id,
              type: "GET",
            })
            .done(function(data) {

              _this.personaDetalle.id = data.id;
              _this.personaDetalle.nombre = data.nombre;
              _this.personaDetalle.apellido = data.apellido;
              _this.personaDetalle.edad = data.edad;
            })
            .fail(function(data) {
                    alert( "error" );
                  });
          },

          limpiarCampos: function()
          {
            this.personaPost.nombre = '';
            this.personaPost.apellido = '';
            this.personaPost.edad = '';
          },

          crearPersona: function(event)
          {

            var _this = this;

            /*$.post( "http://10.60.23.12:62270/api/personas", this.personaPost )
            .done(function(data) {
              _this.personas = data;
              alert( "Creado el usuario: " + data.Nombre + " " + data.Apellidos+ " edad " + data.Edad );
            });*/

            $.ajax({

              type: "POST",
              url: "http://10.60.23.12:50292/api/Personas",
              data: _this.personaPost,

            })
            .done(function(data) {

              _this.personas.push(data);
              alert( "Creado el usuario: " + data.nombre + " " + data.apellido+ " edad " + data.edad + "id:" + data.id);
              _this.limpiarCampos();
          });
          }
        },

        mounted: function() {
          var _this = this;
          $.ajax(
            {
              url : "http://10.60.23.12:50292/api/Personas",
              type: "GET",
            })
            .done(function(data) {
              _this.personas = data;
            })
            .fail(function(data) {
                    alert( "error" );
                  });

        }
        
  	});
  