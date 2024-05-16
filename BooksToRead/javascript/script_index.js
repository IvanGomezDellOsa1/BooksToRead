"use strict";
document.addEventListener("DOMContentLoaded", function() {
    let tabla = document.getElementById("tabla_libros");

    // Obtener datos del sessionStorage
    let biblioteca = JSON.parse(localStorage.getItem("biblioteca")) || []; //JSON.parse(null) genera error. Es decir, si biblioteca = null. Para evitarlo biblioteca = [] (arreglo vacio)

    biblioteca.forEach(libro => {
        // Imprimir datos en la tabla
        tabla.innerHTML += `
            <tr>
                <td rowspan="2">${libro.estado_lectura}</td>
                <td>${libro.titulo}</td>
            </tr>
            <tr>
                <td>${libro.autor}</td>
                <td rowspan="2"><button id="btn_borrar_${libro.id}">${libro.id}</button></td>
            </tr>
        `;
    });
    
    //Segun el ID correspondiente se genera un EventListener a cada boton con el objetivo de poder borrar un libro especifico
    biblioteca.forEach(libro => {
        let btn_borrar = document.getElementById(`btn_borrar_${libro.id}`);
        btn_borrar.addEventListener('click', function() {
            borrarLibro(libro.id);
        });
    });

    function borrarLibro(id) {
        // Elimina el libro especifico segun id y reordena el arreglo biblioteca
        biblioteca.splice(id, 1);
        // Reasigna índices
        for (let i = 0; i < biblioteca.length; i++) {
            biblioteca[i].id = i;
        }
        // Guarda la biblioteca actualizada en localStorage
        localStorage.setItem('biblioteca', JSON.stringify(biblioteca));
        //Refresca la pagina para mostrar los datos actualizados
        window.location.href = "../index.html";
    }
});
