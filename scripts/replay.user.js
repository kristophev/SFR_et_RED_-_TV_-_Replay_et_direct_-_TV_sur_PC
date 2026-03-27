// ==UserScript==
// @name           SFR Replay Volume Control Pour le Replay
// @description    Controle du volume sonore en mode "replay"
// @version        1.0
// @match          https://tv.sfr.fr/*
// @run-at         document-start
// ==/UserScript==

(function() {
    'use strict';
    console.log("Script de mise en place des EventListeners pour le replay !");

    // Fonction pour trouver le slider volume
    function getVolumeSlider() {
        return document.querySelector("player-volume-bar input");
    }

    // Attendre que le slider soit présent
    function waitForVolumeSlider(callback) {
        const timer = setInterval(() => {
            const slider = getVolumeSlider();
            if (slider) {
                clearInterval(timer);
                callback(slider);
            }
        }, 200);
    }


    function init() {
        // Raccourcis clavier pour le volume
        console.log("Volume controle for REPLAY, mise en place... ");
        window.addEventListener("keydown", e => {
            if (!location.pathname.startsWith("/replay/")) return;

            console.log("keydown : "+e.key);
            if (e.key !== "PageUp" && e.key !== "PageDown"
                && e.key!=="AudioVolumeUp" && e.key !=="AudioVolumeDown"
                && e.key!=="ArrowUp" && e.key !=="ArrowDown") return; //on laisse les autres gestionnaires gérer
            const slider = getVolumeSlider();
            if (!slider) {
                console.log("Slider de volume introuvable");
                return;
            }

            let v = parseFloat(slider.value);

            if (e.key === "PageUp" || e.key==="ArrowUp" || e.key==="AudioVolumeUp") {
                v = Math.min(1, v + 0.1);
                console.log("🔊 Volume :", v);
            }

            if (e.key === "PageDown" || e.key==="ArrowDown" || e.key==="AudioVolumeDown") {
                v = Math.max(0, v - 0.1);
                console.log("🔉 Volume :", v);
            }

            e.preventDefault();
            e.stopImmediatePropagation();
            slider.value = v;
            slider.dispatchEvent(new Event("input", { bubbles: true }));

        }, true);

        console.log("Script de mise en place replay FINI !");
    }
    // Lance init() dès que le slider est disponible
    waitForVolumeSlider(init);

})();
