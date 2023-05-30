// ==UserScript==
// @name         ChatGPT BLUR chat history
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This script blurs the chat history in the OpenAI chat interface.
// @author       You
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at document-end
// ==/UserScript==

(async function () {
    'use strict';


    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function removeBlurChatHistory($chatHistory) {
        Array.from($chatHistory.querySelectorAll('li')).map(i => {
            i.style.cssText = ""; // Remove the blur
            return null;
        });
    }


    function applyBlurChatHistory($chatHistory) {
        Array.from($chatHistory.querySelectorAll('li')).map(i => {
            i.style.cssText = "font-size: 40px; color: transparent; text-shadow: 0 0 8px #000;"; // Apply blur
            return null;
        });
    }

    await delay(2000); // 2 seconds
    const $chatHistory = document.querySelector('nav');
    applyBlurChatHistory($chatHistory);

    $chatHistory.addEventListener('mouseover', () => {
        removeBlurChatHistory($chatHistory);
    });

    $chatHistory.addEventListener('mouseout', () => {
        applyBlurChatHistory($chatHistory);
    });
})();
