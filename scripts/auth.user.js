// ==UserScript==
// @name         TV SFR - Authentification Par Christophe VERON (version optimisée)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Verifier si l'utilisateur est authentifié
// @match        https://tv.sfr.fr/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("[TV SFR] Script Authentification chargé (version 2.0 optimisée)");

    function waitUntil(conditionFn, interval = 100) {
        return new Promise(resolve => {
            const timer = setInterval(() => {
                if (conditionFn()) {
                    clearInterval(timer);
                    resolve();
                }
            }, interval);
        });
    }

    async function waitFor(selector) {
        await waitUntil(() => document.querySelector(selector));
        return document.querySelector(selector);
    }

    // -------------------------
    // Fonctions utiles pour le login automatique -
    // l'utilisateur est connu et enregistré
    // -------------------------
    async function isLoggedIn() {
        await waitUntil(() =>
                        document.querySelector('.login-indicator--logged-in') ||
                        document.querySelector('.login-indicator--logged-out')
                       );

        return document.querySelector('.login-indicator--logged-in') !== null;
    }


    // -------------------------
    // INIT : Verification de l'Authentification de l'utilisateur
    // -------------------------
    async function init() {
        console.log("[TV SFR] Initialisation…");

        // Attendre que le composant profile soit chargé
        const profile = await waitFor('gen8-profile .header__profile');

        // Attendre que l’indicateur login soit présent
        const indicator = await waitFor('.login-indicator');

        const loggedIn = await isLoggedIn();
        console.log("[TV SFR] Utilisateur authentifié : ", loggedIn);

        if (!loggedIn) {
            console.log("Authentification…");
            profile.click();

            return; // Le script sera relancé après redirection
        }
    }

    // Init exécuté une seule fois par chargement de la page
    init();

})();
