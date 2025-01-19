'use strict'

//nav
const $nav = document.getElementsByClassName("tab-nav-item");
const navLength = $nav.length;

function selectNav(e) {
  e.preventDefault();
  const $targetNav = e.target;
  const num = $targetNav.dataset.nav;
   
  for (let i = 0; i < navLength; i++) {
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

function accordionView() {
  const button = document.getElementById("accordion-button");
  const contents = document.getElementsByClassName("wrapper")[0];
  let number = 0;
  button.addEventListener("click", () => {
    number = (number + 1) % 2;
    if (number === 1) {
      contents.classList.add("active");
    } else {
      contents.classList.remove("active");
    }
  })
}

accordionView();

for (let i = 0; i < navLength; i++) {
  $nav[i].addEventListener("click", selectNav);
}

//menber 呼び出し
const inputMenber = document.getElementById("menber-file");
const inputLink = document.getElementById("link-file")

function newFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  return reader
}

function todayLeadar() {
  const leadarContent = document.getElementById("today-leadar")
  const menberlist = document.getElementsByClassName("menber");
  const menberLength = menberlist.length;
  const random = Math.floor(Math.random() * menberLength);

  leadarContent.innerText = menberlist[random].innerText; 
}

function addMenber(e) {
  const file = newFile(e);
  let readingFile = "";
 
  file.addEventListener("load", () => {    
    readingFile = file.result.split(",");
    const readingFileLength = readingFile.length;
    const table = document.getElementById("menbers-schedule");
    const title = document.getElementById("main-title");
    const leadar = document.getElementById("today-leadar");
    
    title.innerText = `${readingFile[0]}　4Sボード`;
    table.innerHTML = "<thead><tr><th>名前</th><th>カード</th><th>実施</th><th>気づき</th></tr></thead>";
    
    for (let i = 1; i < readingFileLength; i++) {
      if (typeof readingFile[i] === "string") {
        table.innerHTML += `<tbody><tr><td class="menber" id="menber${i}">${readingFile[i]}</td><td id="card${i}">
        </td><td id="situation${i}"><input type="checkbox" name="situation-checkbox" id="situation-checkbox${i}"></td><td class="flag" id="flag${i}"><input type="checkbox" name="flag-checkbox" id="flag-checkbox${i}"></td></tr></tbody>`;                
      }
    }
    todayLeadar();
  });
}

inputMenber.addEventListener("change", addMenber);

//link挿入
function addLink(e) {
  const file = newFile(e);
  let readingFile = "";

  file.addEventListener("load", () => {    
    readingFile = file.result.split(",");
    const readingFileLength = readingFile.length;

    for (let i = 0; i < readingFileLength; i++) {
      const inputLink = document.getElementById(`link${i}`);
      inputLink.src = readingFile[i];
      const inputQRLink = document.getElementById(`QR${i}`);
      inputQRLink.href = readingFile[i];
    }
  });
}

inputLink.addEventListener("change", addLink);


//table挿入
document.body.onload = addElement;

function addNumber() {
  const td = document.getElementsByClassName("square1");
  const tdLength = td.length;
  for (let i = 0; i < tdLength; i++) {
    const num = i + 1;
    td[i].innerHTML = num;
  }  
}

function addElement() {  
  const table = document.getElementById("map-table");
  const turn = 2;
  const column = 19;
  const row = 12;
  
  for (let i = 0; i < turn; i++) {
    const newTbody = document.createElement("tbody");
    newTbody.className = "table-body";
    newTbody.id = `table-body${i}`;
    table.appendChild(newTbody);
    let counter = 1;
    for (let j = 0; j < row; j++) {
      const tbody = document.getElementById(`table-body${i}`)
      const newTr = document.createElement("tr");
      newTr.id = `table-tr${i}-${j}`;
      tbody.appendChild(newTr);
      for (let k = 0; k < column; k++) {
        const tr = document.getElementById(`table-tr${i}-${j}`)    
        const newTd = document.createElement("td");
        newTd.id = `table-td${i}-${counter}`;
        newTd.className = `square${i}`;
        tr.appendChild(newTd);
        counter++;
      }
    }    
  }
  const tbody0 = document.getElementById("table-body0");
  tbody0.classList.add("table-body-active");
  addNumber();
  mapSelecter();
} 


function mapSelecter() {
  const select = document.getElementsByClassName("select");  
  const selectLength = select.length;
  const talbeTbody = document.getElementsByClassName("table-body");
  const talbeTbodyLength = talbeTbody.length;
  
  for (let i = 0; i < selectLength; i++) {
    select[i].addEventListener("click", (e) =>  {
      for (let j = 0; j < selectLength; j++) {
        select[j].classList.remove("select-active");
      }

      for (let j = 0; j < talbeTbodyLength; j++) {
        talbeTbody[j].classList.remove("table-body-active");
      }

    const selectMap = e.target;
    const num = selectMap.dataset.num;
    selectMap.classList.add("select-active");
    talbeTbody[num].classList.add("table-body-active");   
    });
  }
}

//フルスクリーン
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      toggleFullScreen();
    }
  },
  false,
);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
