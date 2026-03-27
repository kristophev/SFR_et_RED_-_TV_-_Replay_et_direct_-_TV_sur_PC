// ==UserScript==
// @name         TV SFR - Zapping clavier et télécommande Par Christophe VERON (version Finale)
// @namespace    http://tampermonkey.net/
// @version      4.5
// @description  Zapper avec ← → et les numéros uniquement sur les pages TV SFR
// @match        https://tv.sfr.fr/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Empêche les injections multiples du script entier
    if (window.__TV_SFR_SCRIPT_LOADED__) {
        console.warn("[TV SFR] Script déjà chargé → annulation.");
        return;
    }
    window.__TV_SFR_SCRIPT_LOADED__ = true;

    console.log("[TV SFR] Script chargé (version 4.1 optimisée)");

    // -------------------------
    // LISTE DES CHAINES
    // -------------------------
    const chaines = [
        "tf1","france-2","france-3","france-4","france-5","m6","arte","w9","tmc",
        "tfx","tf1-series-films","6ter","la-chaine-lequipe","gulli","lcp-an-ps",
        "franceinfo","bfm-tv","cnews","lci","bfm-business","france-24",
        "france-24-anglais","cnn-international","i24-news","i24-news-anglais",
        "sky-news","tech-co","rmc-talk-info","sfr-actu","rmc-story",
        "rmc-decouverte","rmc-life","cstar","t18","novo19","bfm-grands-reportages",
        "rmc-alerte-secours","warner-tv","ab1","comedy-central","paris-premiere",
        "teva","rtl9","tv5-monde","bfm2","cnews-prime","after-foot-tv",
        "rmc-mecanic","equidia","journal-du-golf-tv","sport-en-france","rmc-wow",
        "rmc-mystere","jirai-dormir-chez-vous","mieux","marmiton-tv",
        "lesprit-sorcier-tv","le-figaro-tv","top-sante-tv","maison-travaux-tv",
        "auto-plus-tv","cartoonito","europe-1-tv","europe-2-pop-tv","m6-music",
        "rfm-tv","trace-latina","bfm-lyon","bfm-grand-lille","bfm-grand-littoral",
        "bfm-marseille-provence","bfm-nice-cote-dazur","bfm-toulon-var",
        "bfm-dici-alpes-du-sud","bfm-dici-haute-provence","bfm-alsace",
        "bfm-normandie","france-3-alpes","france-3-alsace","france-3-aquitaine",
        "france-3-auvergne","france-3-basse-normandie","france-3-bourgogne",
        "france-3-bretagne","france-3-centre","france-3-champagne-ardenne",
        "france-3-via-stella","france-3-cote-dazur","france-3-franche-comte",
        "france-3-haute-normandie","france-3-languedoc","france-3-limousin",
        "france-3-lorraine","france-3-midi-pyrenees","france-3-nord-pas-de-calais",
        "france-3-paris-ile-de-france","france-3-pays-de-loire","france-3-picardie",
        "france-3-poitou-charentes","france-3-provence-alpes","france-3-rhone-alpes",
        "france-3-nouvelle-aquitaine","france-3-corse","20-minutes-tv","tele-bocal",
        "via93","tv78","il-tv","astv","via-matele","7-a-limoges","tv7-bordeaux",
        "tvpi","kanaldude","tv2com","na-tv","canal-32","moselle-tv","puissance-tv",
        "canal-schilick","tvmonaco","mosaik-cristal","tv8-moselle-est","vosges-tv",
        "cannes-lerins-tv","maurienne-tv","telenantes","tv-vendee","lmtv-sarthe",
        "tebeo","tv-rennes-35","val-de-loire-tv","bip-tv","nhk-world-japan"
    ];

    // -------------------------
    // VARIABLE GLOBALE : chaîne courante et URL
    // -------------------------
    let chaineCourante ="";
    if (location.href.includes("/direct-tv/")) chaineCourante = location.href.split("/direct-tv/")[1].split(/[/?]/)[0] || "";
    console.log("VERSION FINALE : chaine TV en cours de visionnage : " + chaineCourante);
    let lastUrl = "";

    // -------------------------
    // NAVIGATION SPA SANS Gestion des changements d'URL
    // -------------------------
    function navigateToChannelSPA(slug) {
        const newUrl = "/direct-tv/" + slug;
        //if (chaineCourante===slug) return;
        history.pushState({}, "", newUrl);
        window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
        chaineCourante=slug;
        console.log("[TV SFR] Chaîne active : ", chaineCourante);
    }

    window.addEventListener("click", function (e) {
        // const a = e.target.closest('a[href="https://tv.sfr.fr/direct-tv"]');
        const a = e.target.closest('a');

        if (!a) return; //gestion déléguée à un autre listener

        // clic gauche uniquement, sans modificateurs
        if (e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        // même domaine
        if (a.origin !== location.origin) return;

        if (!a.href.includes("/direct-tv")) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        console.log("[TV SFR] Clic intercepté sur TV en direct");
        if (a.href === "https://tv.sfr.fr/direct-tv") {
            console.log("Click sur le MENU");
            //change les attributs du menu pour le rentre actif
            a.classList.add("hi");
            a.setAttribute("aria-current", "true");

            navigateToChannelSPA(chaineCourante || "tf1");
            return;
        }

        if (a.href.includes("/direct-tv/")) {
            const chaine = a.href.split("/direct-tv/")[1].split(/[/?]/)[0];
            console.log("Chaîne :", chaine);
            navigateToChannelSPA(chaine);
            // si la chaine est dans la liste des chaines de l'abonnement
            if (chaines.indexOf(chaine)!==-1) chaineCourante=chaine;
        }

    }, true); // Capture de tous les evenements "click"

    // -------------------------
    // ZAPPING
    // -------------------------
    function zap(direction) {
        const index = chaines.indexOf(chaineCourante);
        //on peut très bien être sur une chaine qui ne fait pas partie de l'abonnement
        //if (index === -1) return;

        let newIndex = index + direction;
        if (newIndex < 0) newIndex = chaines.length - 1;
        if (newIndex >= chaines.length) newIndex = 0;

        navigateToChannelSPA(chaines[newIndex]);
    }

    // -------------------------
    // VOLUME
    // -------------------------
    function setVolume(direction) {
        const video = document.querySelector("video");
        if (!video) return;

        let newVolume = video.volume + (direction * 0.05);
        newVolume = Math.max(0, Math.min(1, newVolume));
        video.volume = newVolume;

        video.dispatchEvent(new Event("volumechange", { bubbles: true }));
    }

    // -------------------------
    // ZAPPING PAR NUMÉRO
    // -------------------------
    let numeroBuffer = "";
    let numeroTimer = null;

    function traiterNumero() {
        const numero = parseInt(numeroBuffer, 10);
        numeroBuffer = "";

        if (!isNaN(numero) && chaines[numero - 1]) {
            navigateToChannelSPA(chaines[numero - 1]);
        }
    }

    //Normaliser les touches du clavier/télécommande
    function normalizeKey(key) {
        const map = {
            "&": "1",
            "é": "2",
            "\"": "3",
            "'": "4",
            "(": "5",
            "-": "6",
            "è": "7",
            "_": "8",
            "ç": "9",
            "à": "0"
        };
        return map[key] || key; // si pas dans la map, on garde la touche originale
    }


    // -------------------------
    // INIT : listeners clavier/Télécommande (une seule fois)
    // -------------------------
    async function init() {
        console.log("[TV SFR] Initialisation des contrôles clavier");

        window.addEventListener("keydown", (e) => {
            const key = normalizeKey(e.key);

            const allowed = new Set([
                "ArrowLeft","ArrowRight","ArrowUp","ArrowDown",
                "PageUp", "PageDown",
                "AudioVolumeUp", "AudioVolumeDown", //clavier multimedia//
                "0","1","2","3","4","5","6","7","8","9",
                "s","S","f","F","F5"
            ]);

            if (!location.pathname.startsWith("/direct-tv/")){
                lastUrl="";
                // géré ailleurs (autre script : replay, vod ...)
                return;
            }

            if (key === "F5" || key === "s" || key==="S" || key==="F" || key==="f"){
                console.log("Touches gérées par le navigateur directement enfoncées");
                return;
            }

            console.log("Touche enfoncée : " + key + "    code :  " + e.code);
            const blockedKeys = ["Home", "BrowserHome", "MediaHome"];
            if (blockedKeys.includes(e.code) || blockedKeys.includes(e.key)) {
                console.log("Touche bloquée : ", e.code);
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
            if (!allowed.has(key)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }

            switch (key) {
                case "PageUp":
                case "ArrowRight":
                    zap(+1);
                    break;

                case "PageDown":
                case "ArrowLeft":
                    zap(-1);
                    break;

                case "ArrowUp":
                case "AudioVolumeUp":
                    setVolume(+1);
                    break;

                case "ArrowDown":
                case "AudioVolumeDown":
                    setVolume(-1);
                    break;

                default:
                    if (key >= "0" && key <= "9") {
                        numeroBuffer += key;
                        if (numeroTimer) clearTimeout(numeroTimer);
                        numeroTimer = setTimeout(traiterNumero, 1200);
                    }
            }

            //l'evenement ne doit pas remonter aux autres gestionnaires
            e.preventDefault();
            e.stopImmediatePropagation();
        }, true);
    }

    // Init exécuté une seule fois
    init();

    //passer en production version finale
    const isProd = false; // ou détecte via URL, variable, etc.

    if (isProd) {
        const noop = () => {};
        console.log = noop;
        console.debug = noop;
        console.info = noop;
    }

})();
