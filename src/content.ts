hideAnimePageEps();
hideProfilePageEps();
hideListPageEps();
hideTheOtherOnes();
hideFriendStatus();

function hideAnimePageEps() {
  const selected = document.querySelectorAll("#curEps");
  console.groupCollapsed(`[hideAnimePageEps] checking ${selected.length} in list`);
  for (let element of selected) {
    const eps = element as HTMLSpanElement;
    console.log(eps);
    eps.innerText = "--";
    eps.dataset["num"] = "0";
    eps.style.visibility = "visible";
  }
  console.groupEnd();
}

function hideProfilePageEps() {
  const selected = document.querySelectorAll(".text.anime");
  console.groupCollapsed(`[hideProfilePageEps] checking ${selected.length} in list`);
  for (let element of selected) {
    if (element.classList.contains("watching")) {
      (element as HTMLElement).style.visibility = "visible";
      console.log(element)
      const graph = element.parentElement?.parentElement?.querySelector(".graph.fl-l");
      if (graph) {
        (graph as HTMLElement).style.visibility = "hidden";
        console.log(graph);
      }
    }
    const childNodes = element!.parentElement!.childNodes;
    const target = [...childNodes]
      .find(node =>
        node.nodeType === Node.TEXT_NODE &&
        node.textContent?.includes("/")
      );
    if (!target) continue;
    // console.log(target);
    const targetEl = target as HTMLElement;
    targetEl.textContent = targetEl.textContent.replace(/\d+/, "--");
  }
  console.groupEnd();
}

function hideListPageEps() {
  const selected = document.querySelectorAll(".data.progress");
  console.groupCollapsed(`[hideListPageEps] checking ${[...selected].length} in list`);
  for (let element of selected) {
    const el = element as HTMLElement;
    console.log(el);
    const parentElement = el.parentElement;
    if (!parentElement) {
      console.warn("[hideListPageEps] no parent el", el);
      continue;
    }
    el.style.visibility = "visible";
    if (parentElement.querySelector(".completed") === null) {
      // still watching, hide total eps
      el.textContent = el.textContent.replace(/\/\s*\d+/, "/--");
    } else {
      // done, hide eps
      el.textContent = "--";
    }
  }
  console.groupEnd();
}

function hideTheOtherOnes() {
  // top anime, anime search, main page
  const selected = [...document.querySelectorAll(".information.di-ib.mt4")];
  selected.push(...document.querySelectorAll(".prodsrc .info .item:last-child"));
  selected.push(...document.querySelectorAll("span.info.pt8"));
  selected.push(...document.querySelectorAll(".list-anime-list .info"));
  console.groupCollapsed(`[hideTheOtherOnes] checking ${selected.length} in list`);
  for (let element of selected) {
    console.log(element);
    (element as HTMLElement).style.visibility = "visible";
    element.innerHTML = element.innerHTML.replace(/\d+ eps/, "-- eps");
  }
  console.groupEnd();
}

function hideFriendStatus() {
  const selected = document.querySelectorAll(".work-status");
  console.groupCollapsed(`[hideFriendStatus] checking ${selected.length} in list`);
  for (let element of selected) {
    console.log(element);
    (element as HTMLElement).style.visibility = "visible";
    element.innerHTML = element.innerHTML.replace(/\/\s*\d+/, "/--");
  }
  console.groupEnd();
}