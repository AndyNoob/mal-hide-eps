// ==UserScript==
// @name           mal-hide-eps
// @namespace      https://github.com/AndyNoob
// @version        1.0.0
// @author         AndyNoob
// @description    Hide total episode counts of anime on MyAnimeList.
// @license        MIT
// @match          https://*.myanimelist.net/*
// @grant          none
// @run-at         document-start
// @downloadURL    https://raw.githubusercontent.com/AndyNoob/mal-hide-eps/refs/heads/main/tamper-monkey/mal-hide-eps.user.js
// @supportURL     https://github.com/AndyNoob/mal-hide-eps/issues
// @updateURL      https://raw.githubusercontent.com/AndyNoob/mal-hide-eps/refs/heads/main/tamper-monkey/mal-hide-eps.user.js
// @source         git@github.com:AndyNoob/mal-hide-eps.git
// @homepage       https://github.com/AndyNoob/mal-hide-eps
// ==/UserScript==

(function() {
  const addStyle = (css) => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
  };
  addStyle(`/* anime page, profile page, list page, top anime page, friend status */
#curEps, .text.anime, .data.progress, .information.di-ib.mt4, .work-status {
  visibility: hidden;
}
/* anime search page */
.prodsrc .info .item:last-child {
  visibility: hidden;
}

/* main page */
span.info.pt8 {
  visibility: hidden;
}

/* interest stack */
.list-anime-list .info {
  visibility: hidden;
}`);
})();

(function() {
	//#region src/content.ts
	hideAnimePageEps();
	hideProfilePageEps();
	hideListPageEps();
	hideTheOtherOnes();
	hideFriendStatus();
	function hideAnimePageEps() {
		const selected = document.querySelectorAll("#curEps");
		console.groupCollapsed(`[hideAnimePageEps] checking ${selected.length} in list`);
		for (let element of selected) {
			const eps = element;
			console.log(eps);
			eps.innerText = "--";
			eps.style.visibility = "visible";
		}
		console.groupEnd();
	}
	function hideProfilePageEps() {
		const selected = document.querySelectorAll(".text.anime");
		console.groupCollapsed(`[hideProfilePageEps] checking ${selected.length} in list`);
		for (let element of selected) {
			if (element.classList.contains("watching")) {
				element.style.visibility = "visible";
				console.log(element);
				const graph = element.parentElement?.parentElement?.querySelector(".graph.fl-l");
				if (graph) {
					graph.style.visibility = "hidden";
					console.log(graph);
				}
			}
			const target = [...element.parentElement.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.includes("/"));
			if (!target) continue;
			const targetEl = target;
			targetEl.textContent = targetEl.textContent.replace(/\d+/, "--");
		}
		console.groupEnd();
	}
	function hideListPageEps() {
		const selected = document.querySelectorAll(".data.progress");
		console.groupCollapsed(`[hideListPageEps] checking ${[...selected].length} in list`);
		for (let element of selected) {
			const el = element;
			console.log(el);
			const parentElement = el.parentElement;
			if (!parentElement) {
				console.warn("[hideListPageEps] no parent el", el);
				continue;
			}
			el.style.visibility = "visible";
			if (parentElement.querySelector(".completed") === null) el.textContent = el.textContent.replace(/\/\s*\d+/, "/--");
			else el.textContent = "--";
		}
		console.log("checking information section");
		const span = document.evaluate("//span[contains(., 'Episodes')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
		if (span && span.parentElement) span.parentElement.style.filter = "blur(10px)";
		console.groupEnd();
	}
	function hideTheOtherOnes() {
		const selected = [...document.querySelectorAll(".information.di-ib.mt4")];
		selected.push(...document.querySelectorAll(".prodsrc .info .item:last-child"));
		selected.push(...document.querySelectorAll("span.info.pt8"));
		selected.push(...document.querySelectorAll(".list-anime-list .info"));
		console.groupCollapsed(`[hideTheOtherOnes] checking ${selected.length} in list`);
		for (let element of selected) {
			console.log(element);
			element.style.visibility = "visible";
			element.innerHTML = element.innerHTML.replace(/\d+ eps/, "-- eps");
		}
		console.groupEnd();
	}
	function hideFriendStatus() {
		const selected = document.querySelectorAll(".work-status");
		console.groupCollapsed(`[hideFriendStatus] checking ${selected.length} in list`);
		for (let element of selected) {
			console.log(element);
			element.style.visibility = "visible";
			element.innerHTML = element.innerHTML.replace(/\/\s*\d+/, "/--");
		}
		console.groupEnd();
	}
	//#endregion
})();
