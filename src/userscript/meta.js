// ==UserScript==
// @name        Wanikani hanzi-writer addition
// @namespace   https://declanfodor.com
// @description Replaces kanji in wanikani with hanzi writer. Licenses for kanji data are found at https://github.com/chanind/hanzi-writer-data-jp/
// @match       https://www.wanikani.com/*
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       GM_setvalue
// @grant       GM_getValue
// @version     0.0.3
// @author      Declan Fodor
// @resource    kanjiJSON https://raw.githubusercontent.com/chanind/hanzi-writer-data-jp/master/data/all.json
// @require     https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.js
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @license     MIT
// ==/UserScript==

/**
 * Please use https://declanfodor.com/hanzi-writer-data-jp.json for all.json when developing, and 
 * https://raw.githubusercontent.com/chanind/hanzi-writer-data-jp/master/data/all.json for releases.
 */
