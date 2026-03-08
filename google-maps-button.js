// ==UserScript==
// @name         Google Maps Button
// @namespace    http://tampermonkey.net/
// @version      2026.03.08.1
// @description  Adds "Maps" tab and "Open in Maps" button to Google search results
// @author       Avenpro Team
// @match        https://www.google.com/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @updateURL    https://raw.githubusercontent.com/AvenproTeam/google-maps-button/main/google-maps-button.user.js
// @downloadURL  https://raw.githubusercontent.com/AvenproTeam/google-maps-button/main/google-maps-button.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const searchQuery = new URLSearchParams(window.location.search).get('q');
    if (!searchQuery) return;

    const mapsURL = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;

    // --- Add Maps tab ---
    function addMapsTab() {
        const nav = document.querySelector('div[role="navigation"]');
        if (!nav || nav.querySelector('.gmaps-tab')) return;

        const allTab = nav.querySelector('a');
        if (!allTab) return;

        const mapsTab = allTab.cloneNode(true);
        mapsTab.classList.add('gmaps-tab');
        mapsTab.href = mapsURL;

        // Change text
        const label = mapsTab.querySelector('span') || mapsTab;
        label.textContent = 'Maps';

        allTab.parentNode.appendChild(mapsTab);
    }

    // --- Add Open in Maps button to big maps ---
    function addOpenInMapsButton() {
        const mapContainers = document.querySelectorAll('g-inner-card, div[data-attrid*="map"]');
        mapContainers.forEach(container => {
            if (container.querySelector('.open-in-maps-btn')) return;

            // Create button
            const btn = document.createElement('a');
            btn.href = mapsURL;
            btn.target = '_blank';
            btn.textContent = 'Open in Maps';
            btn.className = 'open-in-maps-btn';
            btn.style.cssText = `
                display:inline-block;
                margin: 5px 0;
                padding: 5px 10px;
                background: #4285F4;
                color: white;
                font-size: 12px;
                border-radius: 4px;
                text-decoration: none;
            `;
            container.appendChild(btn);
        });
    }

    // --- Observe DOM changes ---
    const observer = new MutationObserver(() => {
        addMapsTab();
        addOpenInMapsButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run
    addMapsTab();
    addOpenInMapsButton();
})();
