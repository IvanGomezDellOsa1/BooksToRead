"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let tabla = document.getElementById("tabla_libros");

    // Obtener datos del sessionStorage
    let biblioteca = JSON.parse(localStorage.getItem("biblioteca")) || []; //JSON.parse(null) genera error. Es decir, si biblioteca = null. Para evitarlo biblioteca = [] (arreglo vacio)

    biblioteca.forEach((libro) => {
        // Imprimir datos en la tabla
        tabla.innerHTML += `
            <tr>
                <td class="td__titulo">${libro.titulo}</td>
                <td class="btn_borrar">
                    <button id="btn_borrar_${libro.id}">
                        <img src="./css/images/img_borrar.png" alt="img_borrar">
                    </button>
                </td>
            </tr>
            <tr class="tr__inferior">
                <td>${libro.autor}</td>
                <td>${libro.estado_lectura}</td>
            </tr>
        `;
    });

    //Segun el ID correspondiente se genera un EventListener a cada boton con el objetivo de poder borrar un libro especifico
    biblioteca.forEach((libro) => {
        let btnBorrar = document.getElementById(`btn_borrar_${libro.id}`);
        btnBorrar.addEventListener("click", function () {
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
        localStorage.setItem("biblioteca", JSON.stringify(biblioteca));
        //Refresca la pagina para mostrar los datos actualizados
        window.location.reload();
    }
});
