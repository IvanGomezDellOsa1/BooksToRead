"use strict";

document.addEventListener("DOMContentLoaded", function () {
    //Eliminar local storage que no se uso
    localStorage.removeItem('libroId');

    let tabla = document.getElementById("tabla_libros");   
    cargarLibros();

    async function cargarLibros() {
        try {
            let response = await fetch('https://667893330bd45250561f25c0.mockapi.io/api/BooksToRead/Libros', {
                method: 'GET'
            });

            let biblioteca = await response.json();
    
            // Limpiar tabla antes de agregar nuevos datos
            tabla.innerHTML = '';
    
            biblioteca.forEach((libro) => {
                // Imprimir datos en la tabla
                tabla.innerHTML += `
                    <tr>
                        <td class="td__titulo">${libro.titulo}</td>
                        <td class="btn_borrar">
                            <button id="btn_borrar_${libro.id}">
                                <img src="./css/images/img_borrar.png" alt="img_borrar">
                            </button>
                            <button id="btn_editar_${libro.id}">
                                <img src="./css/images/img_editar.png" alt="img_editar">
                            </button>
                        </td>
                    </tr>
                    <tr class="tr__inferior">
                        <td>${libro.autor}</td>
                        <td>${libro.estado_lectura}</td>
                    </tr>
                `;
            });
    
            // Asignar eventos de click a los botones de borrar y editar
            asignarEventosBotones(biblioteca);
        } catch (error) {
            console.error('Error cargando libros:', error);
        }
    }

    function asignarEventosBotones(biblioteca) {
        biblioteca.forEach((libro) => {
            let btnBorrar = document.getElementById(`btn_borrar_${libro.id}`);
            let btnEditar = document.getElementById(`btn_editar_${libro.id}`);

            btnBorrar.addEventListener("click", function () {
                borrarLibro(libro.id);
            });
            btnEditar.addEventListener("click", function () {
                editarLibro(libro.id);
            });
        });
    }

    async function borrarLibro(id) {
        try{
            // Eliminar libro de MockApi usando DELETE
            let response = await fetch(`https://667893330bd45250561f25c0.mockapi.io/api/BooksToRead/Libros/${id}`, {
                method: 'DELETE'
            })
            if(response.status === 200 ){
                console.log('Libro eliminado correctamente.');
                // Refrescar la página para mostrar los datos actualizados
                window.location.reload();
            }
        } catch (error) {
            console.log("Error eliminando libro", error);
        }
    }

    function editarLibro(id) {
        // Almacenar el ID del libro en localStorage
        localStorage.setItem('libroId', id);
        // Redirigir a agregar_libro.html para editar el libro
        window.location.href = '../html/agregar_libro.html';
    }
});

