"use strict";

document.addEventListener("DOMContentLoaded", function () {
    let formAgregarLibro = document.getElementById("form_agregar_libro");

    // Obtener el ID del libro de localStorage
    let libroId = localStorage.getItem("libroId");

    if (libroId) {
        // Si hay un ID de libro, cargar los datos del libro para editar
        cargarLibroAEditar(libroId);
    }

    async function cargarLibroAEditar(libroId) {
        try {
            let response = await fetch(
                `https://667893330bd45250561f25c0.mockapi.io/api/BooksToRead/Libros/${libroId}`
            );
            if (response.status === 200) {
                console.log("ID obtenido");
                let libro = await response.json();

                // Precargar los datos del libro a editar en el formulario
                formAgregarLibro.elements["titulo"].value = libro.titulo;
                formAgregarLibro.elements["autor"].value = libro.autor;
                formAgregarLibro.elements["estado_lectura"].value =
                    libro.estado_lectura;
            }
        } catch (error) {
            console.log("No se pudieron obtener los datos del libro.", error);
        }
    }

    formAgregarLibro.addEventListener("submit", async function (e) {
        e.preventDefault(); // Detener el envío del formulario por defecto

        // Tomar datos del form
        let formData = new FormData(formAgregarLibro);
        let titulo = formData.get("titulo");
        let autor = formData.get("autor");
        let estadoLectura = formData.get("estado_lectura");

        // JSON con datos del libro
        let libro = {
            titulo: titulo,
            autor: autor,
            estado_lectura: estadoLectura,
        };

        if (libroId) {
            editarLibro(libroId, libro);
        } else {
            agregarNuevoLibro(libro);
        }
    });

    async function editarLibro(libroId, libro) {
        try {
            // Enviar datos a MockApi usando PUT (editar libro)
            let response = await fetch(
                `https://667893330bd45250561f25c0.mockapi.io/api/BooksToRead/Libros/${libroId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(libro),
                }
            );
            if (response.status === 200) {
                //Eliminar local Storage
                localStorage.removeItem("libroId");
                // Vuelve a inicio después de editar el libro
                window.location.href = "../index.html";
            }
        } catch (error) {
            console.log("Error editando libro", error);
        }
    }
    async function agregarNuevoLibro(libro) {
        try {
            // Enviar datos a MockApi usando POST (Nuevo libro)
            let response = await fetch(
                "https://667893330bd45250561f25c0.mockapi.io/api/BooksToRead/Libros",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(libro),
                }
            );
            if (response.status === 201) {
                // Vuelve a inicio después de agregar el libro
                window.location.href = "../index.html";
            }
        } catch (error) {
            console.log("Error agregando libro", error);
        }
    }
});
