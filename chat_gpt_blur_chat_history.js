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

    function blurChatHistory() {
        Array.from(document.querySelectorAll('div.flex-col ol li')).map(i => {
            i.style.cssText = "font-size: 40px; color: transparent; text-shadow: 0 0 8px #000;";
            i.addEventListener('mouseover', () => {
                Array.from(i.parentElement.parentElement.parentElement.querySelectorAll('li')).map(j => {
                    j.style.cssText = ""; // Remove the blur when mouse is over
                    return null;
                });
            });
            i.addEventListener('mouseout', () => {
                Array.from(i.parentElement.parentElement.parentElement.querySelectorAll('li')).map(j => {
                    j.style.cssText = "font-size: 40px; color: transparent; text-shadow: 0 0 8px #000;"; // Apply blur when mouse is out
                    return null;
                });
            });
            return null;
        });
    }

    function observeChanges() {
        // Function to monitor changes in the specific element

        // Get the elements to observed
        const elements = Array.from(document.querySelectorAll('div.flex-col ol'));
        console.log('elements:', elements);

        if (elements) {
            // Create a new MutationObserver
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    // Check if nodes have been added to the element
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Check if additional <li> tags have been added
                        const addedLiTags = Array.from(mutation.addedNodes).filter(node => node.tagName === 'LI');
                        if (addedLiTags.length > 0) {
                            console.log('New <li> tags have been added to the element');
                            // Here you can add the code you want to execute when the element is changed
                        }
                    }
                }

                blurChatHistory();
            });

            // Observe changes in the element
            elements.map(i => observer.observe(i, { childList: true }));
        } else {
            console.log('No element found');
        }
    }


    await delay(2000); // 2 seconds
    blurChatHistory();
    // Call the function to start monitoring the changes
    observeChanges();
})();
