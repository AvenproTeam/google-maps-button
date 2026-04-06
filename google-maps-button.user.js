// ==UserScript==
// @name         Google Maps Button
// @namespace    http://tampermonkey.net/
// @version      2026.3.8
// @description  Restores Maps button using Google's native CSS classes with perfect alignment.
// @author       Avenpro Team
// @match        https://www.google.com/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const getMapsURL = () => {
        const query = new URLSearchParams(window.location.search).get('q');
        return query ? `https://www.google.com/maps?q=${encodeURIComponent(query)}` : null;
    };

    const applyFixes = () => {
        const url = getMapsURL();
        if (!url || document.querySelector('.gmaps-custom-tab')) return;

        // 1. TOP NAVIGATION TAB BUTTON
        const listContainer = document.querySelector('div[role="list"]');
        if (listContainer) {
            const listItem = document.createElement('div');
            listItem.setAttribute('role', 'listitem');
            listItem.className = 'gmaps-custom-tab';

            listItem.innerHTML = `<a class="C6AK7c" href="${url}" target="_blank" role="link" style="text-decoration:none;"><div class="mXwfNd"><span class="R1QWuf">Maps</span></div></a>`;

            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';

            listContainer.appendChild(listItem);
        }

        // 2. MAP MINIATURE LINK
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
    };

    const style = document.createElement('style');
    style.innerHTML = `
        .gmaps-custom-tab .mXwfNd {
            padding: 0 12px;
            height: 34px;
            display: flex;
            align-items: center;
            transition: background 0.2s;
        }
        .gmaps-custom-tab .R1QWuf {
            line-height: normal !important;
            vertical-align: middle !important;
            display: inline-flex;
            align-items: center;
        }
    `;
    document.head.appendChild(style);

    const observer = new MutationObserver(() => applyFixes());
    observer.observe(document.body, { childList: true, subtree: true });
    applyFixes();
})();