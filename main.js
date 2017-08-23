  $(document).ready( function() {
  var app = new Vue({
  		el: '#maestro',
    		data: {
      		selected: '',
          seen:{seenCreate: false, seenDelete: false, seenUpdate: false},
      		personas: [],
          personaDel : {id: ''},
          personaPost : {nombre: '', apellido: '', edad: '' },
          personaPut : {id: '', nombre: '', apellido: '', edad: ''},
          personaDetalle: {id: '', nombre: '', pellido: '', edad: ''}
      	},

        methods: {

          mostrarDetalles: function(id)
          {

            var _this = this;
            $.ajax(
            {
              url : "http://localhost:50292/api/Personas/" + id,
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

          crearPersona: function(event)
          {

            var _this = this;

            $.ajax({

              type: "POST",
              url: "http://localhost:50292/api/Personas",
              data: _this.personaPost,

            })
            .done(function(data) {

              alert( "Creado el usuario -> " + "Id: " + data.id + " Nombre: " + data.nombre + " Apellidos: " + data.apellido + " Edad: " + data.edad);
              _this.refreshList();
              _this.limpiarCamposPost();
              _this.limpiarCamposSeen();
              _this.limpiarCamposDetalles();
          })
          .fail(function(data) {
              alert( "error" );
          });
        },

        actualizarPersona: function(event)
        {

          var _this = this;

          $.ajax({

            type: "PUT",
            url: "http://localhost:50292/api/Personas/" + _this.personaPut.id,
            data: _this.personaPut,

          })
          .done(function(data) {

            alert( "Se ha actualizado el usuario");
            _this.refreshList();
            _this.limpiarCamposPut();
            _this.limpiarCamposSeen();
            _this.limpiarCamposDetalles();
        })
        .fail(function(data) {
            alert( "error" );
        });
      },

      eliminarPersona: function(event)
      {

        var _this = this;

        $.ajax({

          type: "DELETE",
          url: "http://localhost:50292/api/Personas/" + _this.personaDel.id,
          data: _this.personaDel,

        })
        .done(function(data) {
          alert( "Eliminado el usuario -> " + "Id: " + data.id + " Nombre: " + data.nombre + " Apellidos: " + data.apellido + " Edad: " + data.edad);
          _this.refreshList();
          _this.limpiarCamposDelete();
          _this.limpiarCamposSeen();
          _this.limpiarCamposDetalles();
      })
      .fail(function(data) {
          alert( "error" );
      });
    },

          refreshList: function()
          {

            var _this = this;
            $.ajax(
              {
                url : "http://localhost:50292/api/Personas",
                type: "GET",
              })
              .done(function(data) {
                _this.personas = data;
              })
              .fail(function(data) {
                      alert( "error" );
                    });
          },

          seenCreateAux: function()
          {
              var _this = this;
              _this.seen.seenCreate = !_this.seen.seenCreate;
              _this.seen.seenUpdate = false;
              _this.seen.seenDelete = false;
          },

          seenUpdateAux: function()
          {
              var _this = this;
              _this.seen.seenUpdate = !_this.seen.seenUpdate;
              _this.seen.seenCreate = false;
              _this.seen.seenDelete = false;
          },

          seenDeleteAux: function()
          {
              var _this = this;
              _this.seen.seenDelete = !_this.seen.seenDelete;
              _this.seen.seenUpdate = false;
              _this.seen.seenCreate = false;
          },

          limpiarCamposDetalles: function()
          {
            this.personaDetalle.id = '';
            this.personaDetalle.nombre = '';
            this.personaDetalle.apellido = '';
            this.personaDetalle.edad = '';
          },

          limpiarCamposDelete: function()
          {
            this.personaDel.id = '';
          },

          limpiarCamposPost: function()
          {
            this.personaPost.nombre = '';
            this.personaPost.apellido = '';
            this.personaPost.edad = '';
          },

          limpiarCamposPut: function()
          {
            this.personaPut.id = '';
            this.personaPut.nombre = '';
            this.personaPut.apellido = '';
            this.personaPut.edad = '';
          },

          limpiarCamposSeen: function()
          {
            this.seen.seenCreate = false;
            this.seen.seenDelete = false;
            this.seen.seenUpdate = false;
          }

        },

        mounted: function() {
          var _this = this;
          $.ajax(
            {
              url : "http://localhost:50292/api/Personas",
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
  });
