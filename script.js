'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const $nav = document.getElementsByClassName("tab-nav-item");
const navLength = $nav.length;

function selectNav(e) {
  e.preventDefault();
  const $targetNav = e.target;
  const num = $targetNav.dataset.nav;
  console.log(num);
  
  for (let i=0; i < navLength; i++) {
    $nav[i].classList.remove("is-active");
    const $items = document.getElementsByClassName(`item${i}`)
    for (const item of $items) {
      item.style.display = "none";
    }
  }

  $nav[num].classList.add("is-active");
  const $items = document.getElementsByClassName(`item${num}`);
  for (const item of $items) {
    item.style.display = "block";
  }
}

for (let i = 0; i < navLength; i++) {
  $nav[i].addEventListener("click", selectNav);
}
