// ==UserScript==
// @name         Google Maps Button
// @namespace    http://tampermonkey.net/
// @version      2026.3.1
// @description  Restores the Maps button and makes map thumbnails clickable on Google Search.
// @author       Avenpro Team
// @match        https://www.google.com/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @updateURL    https://raw.githubusercontent.com/AvenproTeam/google-maps-button/main/google-maps-button.user.js
// @downloadURL  https://raw.githubusercontent.com/AvenproTeam/google-maps-button/main/google-maps-button.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function getMapsURL() {
        const query = new URLSearchParams(window.location.search).get('q');
        return query ? `https://www.google.com/maps?q=${encodeURIComponent(query)}` : null;
    }

    function applyFixes() {
        const url = getMapsURL();
        if (!url) return;

        // 1. Hacer clicable la miniatura del mapa (Ficha de ubicación)
        const mapDiv = document.getElementById('lu_map') || document.querySelector('[data-atf="1"]')?.parentElement;
        if (mapDiv && !mapDiv.dataset.linked) {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.style.cssText = 'display:block; cursor:pointer;';
            link.innerHTML = mapDiv.innerHTML;
            mapDiv.innerHTML = '';
            mapDiv.appendChild(link);
            mapDiv.dataset.linked = "true";
        }

        // 2. Añadir pestaña "Maps" en la barra de navegación
        // Intentamos detectar el contenedor de pestañas de Google (clases variables)
        const navBar = document.querySelector('div[role="navigation"] div[data-hveid], .crJ18e, .IUO91c');
        if (navBar && !document.querySelector('.gmaps-custom-tab')) {
            const btn = document.createElement('a');
            btn.href = url;
            btn.className = 'gmaps-custom-tab';
            btn.innerHTML = 'Maps';
            btn.style.cssText = `
                margin-left: 12px;
                padding-left: 20px;
                text-decoration: none;
                color: #3c4043;
                font-size: 14px;
                display: inline-flex;
                align-items: center;
                position: relative;
                cursor: pointer;
            `;

            // Create the vertical line separator using a separate div or pseudo-element logic
            const separator = document.createElement('div');
            separator.style.cssText = `
                position: absolute;
                left: 0;
                top: 20%;
                height: 60%;
                width: 1px;
                background-color: #dadce0;
            `;
            
            // Using appendChild ensures it goes to the end (right side)
            btn.prepend(separator);
            navBar.appendChild(btn);
        }
    }

    // Usamos un intervalo para asegurar que funcione incluso si la página carga por partes
    setInterval(applyFixes, 1000);
    applyFixes();
})();
