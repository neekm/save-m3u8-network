// ==UserScript==
// @name         Capture m3u8 URLs from network
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get the m3u8 URLs of the page
// @author       Thalisson Barbosa
// @match        https://*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/neekm/save-m3u8-network/master/script.js
// @updateURL    https://raw.githubusercontent.com/neekm/save-m3u8-network/master/script.js
// ==/UserScript==

function captureNetworkRequest(e) {

    var m3u8
    var capture_network_request = []
    var capture_resource = performance.getEntriesByType("resource")

    for (var i = 0; i < capture_resource.length; i++) {
        if (capture_resource[i].name.includes('.mp4.m3u8')) {

            var url = capture_resource[i].name

            if (!localStorage.m3u8) {
                m3u8 = []
            } else {
                m3u8 = JSON.parse(localStorage.m3u8)
            }
            if (!(m3u8 instanceof Object)) {
                m3u8 = []
            }

            m3u8.push(url);

            localStorage.setItem('m3u8', JSON.stringify(m3u8))

        }
    }

    var m3u8_failed

    if (typeof m3u8 !== 'object') {

        if (!localStorage.m3u8_failed) {
            m3u8_failed = []
        } else {
            m3u8_failed = JSON.parse(localStorage.m3u8_failed)
        }
        if (!(m3u8_failed instanceof Object)) {
            m3u8_failed = []
        }

        m3u8_failed.push(window.location.href);

        localStorage.setItem('m3u8_failed', JSON.stringify(m3u8_failed))
    }
}

setTimeout(function(){
    captureNetworkRequest()
},2000);
