"use strict";
document.addEventListener("DOMContentLoaded", function() {

    let form_agregar_libro = document.getElementById("form_agregar_libro");

    //Detener Submit si existe
    try  {
        form_agregar_libro.addEventListener('submit', detenerSubmit);
    } catch(error) {
        console.log('No hay submit')
    };
    
    function detenerSubmit(e){
        e.preventDefault();
        console.log('Envio submit detenido')
    };
    
    //Agregar libro
    try{
        form_agregar_libro.addEventListener('submit', cargarDatos);
    } catch{
        console.log('Aca no se cargan datos')
    };

    function cargarDatos(){
    //Tomar datos del form
    let formData = new FormData(form_agregar_libro);
    let titulo = formData.get('titulo');
    let autor = formData.get('autor');
    let estado_lectura = formData.get('estado_lectura');

    if (autor === ''){
        autor = 'No ingresaste autor'
    };

    // Obtener biblioteca del localStorage
    let biblioteca = JSON.parse(localStorage.getItem('biblioteca')) || []; //JSON.parse(null) genera error. Es decir, si biblioteca = null. Para evitarlo biblioteca = [] (arreglo vacio)

    let id = biblioteca.length;

    //JSON con datos del libro
    let libro = {
        id : id,
        titulo : titulo,
        autor : autor,
        estado_lectura : estado_lectura
    };

    biblioteca.push(libro);
    //Convierte biblioteca en un JSON y lo guarda en localStorage
    localStorage.setItem('biblioteca', JSON.stringify(biblioteca));
    //Cambio de pantalla
    window.location.href = "../index.html";
    //En index.html se ejectura script_index donde se imprime toda la biblioteca incluido el ultimo libro
    }
});


