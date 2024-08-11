// ==UserScript==
// @name        Wanikani hanzi-writer addition
// @namespace   https://declanfodor.com
// @description Replaces kanji in wanikani with hanzi writer. Licenses for kanji data are found at https://github.com/chanind/hanzi-writer-data-jp/
// @match       https://www.wanikani.com/*
// @grant       GM_getResourceText
// @version     0.0.1
// @author      Declan Fodor
// @resource    kanjiJSON https://raw.githubusercontent.com/chanind/hanzi-writer-data-jp/master/data/all.json
// @require     https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.js
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @license     MIT
// ==/UserScript==

/**
 * Code here will be ignored on compilation. So it's a good place to leave messages to developers.
 *
 * - The `@grant`s used in your source code will be added automatically by `rollup-plugin-userscript`.
 *   However you have to add explicitly those used in required resources.
 * - `process.env.VERSION` and `process.env.AUTHOR` will be loaded from `package.json`.
 */
