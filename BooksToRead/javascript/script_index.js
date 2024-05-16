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
            </tr>
        `;
    });
});