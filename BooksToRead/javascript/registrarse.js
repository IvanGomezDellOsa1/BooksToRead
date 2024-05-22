"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let captchaForm = document.querySelector(".captcha_form");
    let captchaDesafio = document.querySelector(".captcha_desafio");
    let captchaResultado = document.getElementById("captcha_resultado");

    let numero_desafio = Math.floor(100000 + Math.random() * 90000); // Genera un numero aleatorio de 6 digitos entre 100000 y 999999
    captchaDesafio.innerHTML = numero_desafio; //Imprime el numero aleatorio de 6 digitos

    function detenerSubmit(e) {
        e.preventDefault();
        console.log("Envio submit detenido");
        let captchaData = new FormData(captchaForm);
        let numero_respuesta = Number(captchaData.get("numero_respuesta")); //Toma el dato que el usuario ingreso como respuesta al CAPTCHA (Transforma de String a numero)
        evaluarRespuesta(numero_respuesta, numero_desafio);
    }

    function evaluarRespuesta(numero_respuesta, numero_desafio) {
        captchaResultado.classList.remove(
            "captcha_resultado_positivo",
            "captcha_resultado_negativo"
        ); //Evita que si hay mas de un intento se acumulen las clases
        
        if (numero_respuesta === numero_desafio) {
            captchaResultado.classList.add("captcha_resultado_positivo");
            captchaResultado.innerHTML =
                "Resultado correcto(Envio completado)";
        } else {
            captchaResultado.classList.add("captcha_resultado_negativo");
            captchaResultado.innerHTML =
                "Resultado incorrecto(Intente de nuevo)";
        }
    }
    captchaForm.addEventListener("submit", detenerSubmit);
});
