// ==UserScript==
// @name         Google Maps Button (Clean Logic)
// @namespace    http://tampermonkey.net/
// @version      2026.3.5
// @description  Restores clickable thumbnails and perfectly aligns the Maps button with clean arrow functions.
// @author       Avenpro Team
// @match        https://www.google.com/search*
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

        // --- 1. RESTORE CLICKABLE MAP THUMBNAIL ---
        const mapDiv = document.getElementById('lu_map') || document.querySelector('[data-atf="1"]')?.closest('div');
        if (mapDiv && !mapDiv.dataset.linked) {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.style.cssText = 'display:block; cursor:pointer; width:100%; height:100%; border:0;';

            link.innerHTML = mapDiv.innerHTML;
            mapDiv.innerHTML = '';
            mapDiv.appendChild(link);
            mapDiv.dataset.linked = "true";
        }

        // --- 2. ADD "MAPS" TO FIRST ROW ---
        if (document.querySelector('.gmaps-custom-tab')) return;

        const allElements = document.querySelectorAll('div, span, a');
        let herramientasBtn = null;

        for (const el of allElements) {
            if (el.innerText === 'Herramientas' || el.innerText === 'Tools') {
                herramientasBtn = el.closest('div[role="listitem"]') || el.parentElement;
                break;
            }
        }

        if (herramientasBtn) {
            const container = herramientasBtn.parentElement;

            // Clean assignment (not returned)
            container.style.display = 'flex';
            container.style.flexWrap = 'nowrap';
            container.style.alignItems = 'center';
            container.style.width = 'max-content';

            const btn = document.createElement('a');
            btn.href = url;
            btn.className = 'gmaps-custom-tab';
            btn.target = '_blank';
            btn.innerHTML = 'Maps';

            // Using flex and explicit height for perfect centering
            btn.style.cssText = `
                display: inline-flex;
                align-items: center;
                padding: 0 12px;
                text-decoration: none;
                color: #3c4043;
                font-size: 14px;
                height: 100%;
                min-height: 44px;
                white-space: nowrap;
                cursor: pointer;
                flex-shrink: 0;
                box-sizing: border-box;
            `;

            const separator = document.createElement('div');
            separator.style.cssText = `
                height: 16px;
                width: 1px;
                background-color: #dadce0;
                margin-right: 12px;
                flex-shrink: 0;
            `;

            btn.prepend(separator);
            herramientasBtn.after(btn);

            // --- 3. HIDE SCROLL ARROW (Clean Block Body) ---
            setTimeout(() => {
                const arrows = document.querySelectorAll('.O89U6d, .U68p9c, button[aria-label*="Siguiente"], button[aria-label*="Next"]');
                arrows.forEach((a) => {
                    a.style.display = 'none';
                });
            }, 100);
        }
    }

    const observer = new MutationObserver(() => {
        applyFixes();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    applyFixes();
})();