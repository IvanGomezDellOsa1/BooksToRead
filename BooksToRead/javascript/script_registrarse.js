"use strict";
document.addEventListener("DOMContentLoaded", function() {
    let captcha_form = document.querySelector('.captcha_form');
    let captcha_desafio = document.querySelector('.captcha_desafio');
    let captcha_resultado = document.getElementById('captcha_resultado');

let numero_desafio = Math.floor(100000 + Math.random() * 90000);   // Genera un numero aleatorio de 6 digitos entre 100000 y 999999

captcha_desafio.innerHTML = numero_desafio; //Imprime el numero aleatorio de 6 digitos

function detenerSubmit(e){
    e.preventDefault();
    console.log('Envio submit detenido')
    let captchaData = new FormData(captcha_form);
    let numero_respuesta = Number(captchaData.get('numero_respuesta')); //Toma el dato que el usuario ingreso como respuesta al CAPTCHA (Transforma de String a numero)
    evaluarRespuesta(numero_respuesta, numero_desafio);
};

function evaluarRespuesta(numero_respuesta, numero_desafio){
    captcha_resultado.classList.remove('captcha_resultado_positivo', 'captcha_resultado_negativo'); //Evita que si hay mas de un intento se acumulen las clases
    if (numero_respuesta === numero_desafio){
        captcha_resultado.classList.add('captcha_resultado_positivo');
        captcha_resultado.innerHTML = 'Resultado correcto(Envio completado)';
    } else{
        captcha_resultado.classList.add('captcha_resultado_negativo');
        captcha_resultado.innerHTML = 'Resultado incorrecto(Intente de nuevo)';
    }
}

captcha_form.addEventListener('submit', detenerSubmit);

});

