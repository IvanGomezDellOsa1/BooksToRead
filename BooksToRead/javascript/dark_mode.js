"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const toggleDarkMode = document.getElementById("modo_oscuro");
    const body = document.querySelector("body");
    const bars = document.querySelectorAll(".bar");
    const navBar = document.getElementById("nav");

    toggleDarkMode.addEventListener("click", function () {
        toggleDarkMode.classList.toggle("modo_oscuro");
        body.classList.toggle("modo_oscuro");
        bars.forEach((bars) => { //Son 3 necesita aplicarse a cada una
            bars.classList.toggle("modo_oscuro");
        });
        navBar.classList.toggle("modo_oscuro");
    });
});
