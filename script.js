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

function newFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  return reader;
}

function random(number) {
  return Math.floor(Math.random() * number);
}

function todayLeadar() {
  const leadarContent = document.getElementById("today-leadar")
  const menberlist = document.getElementsByClassName("menber");
  const menberLength = menberlist.length;
  const num = random(menberLength);

  leadarContent.innerText = menberlist[num].innerText; 
}

function addMenber(e) {
  const reader = newFile(e);
 
  reader.addEventListener("load", () => {
    const lineBreak = reader.result.split("\n");   
    const readingFile = lineBreak[0].split(",");
    const readingFileLength = readingFile.length;
    const table = document.getElementById("menbers-schedule");
    const title = document.getElementById("main-title");
    
    title.innerText = `${readingFile[0]}　4Sボード`;
    table.innerHTML = "<thead><tr><th>名前</th><th>カード</th><th>状態</th><th>気づき</th></tr></thead>";
    
    const newTbody = document.createElement("tbody");
    newTbody.id = "menber-table-tbody";
    table.appendChild(newTbody);

    for (let i = 1; i < readingFileLength; i++) {
      if (typeof readingFile[i] === "string") {
        const newTr = document.createElement("tr");        
        const nameTd = document.createElement("td");
        const cardTd = document.createElement("td");
        const situationTd = document.createElement("td");
        const flagTd = document.createElement("td");

        nameTd.className = "menber";
        cardTd.className = "card";
        situationTd.className = "situation";
        flagTd.className = "flag";

        nameTd.id = `menber${i}`;
        cardTd.id = `card${i}`;
        situationTd.id = `situation${i}`;
        flagTd.id = `flag${i}`;

        nameTd.textContent = `${readingFile[i]}`;
        situationTd.textContent = "未";
        
        newTbody.appendChild(newTr);
        newTr.appendChild(nameTd);
        newTr.appendChild(cardTd);
        newTr.appendChild(situationTd);
        newTr.appendChild(flagTd);

        let situationcounter = 0;
        situationTd.addEventListener("click", () => {
          situationcounter = (situationcounter + 1) % 3;
          if (situationcounter === 1) {
            situationTd.textContent = "済"
            situationTd.style.color = "blue";
            situationTd.style.backgroundColor = "rgba(48, 79, 255, 0.398)";
            

          } else if (situationcounter === 2) {
            situationTd.textContent = "休"
            situationTd.style.color = "#fff";
            situationTd.style.backgroundColor = "#565659";

          } else {
            situationTd.textContent = "未"
            situationTd.style.color = "#00010D";
            situationTd.style.backgroundColor = "#F8FBFD";
          }
        });
        
        let flagcounter = 0;
        flagTd.addEventListener("click", () => {
          flagcounter = (flagcounter + 1) % 2;
          if (flagcounter === 1) {
            flagTd.textContent = "🚩";
          } else {
            flagTd.textContent = "";
          }          
        });
      }
    }
    todayLeadar();
    today4s(reader);
  });
}

inputMenber.addEventListener("change", addMenber);

//月の予定
const cardArray = [];
const areaArray = [];
const randomCards = [];

function today4s(reader) {
  const array = reader.result.split("\n");
  const dayMenu = [];

  for (const areaArray of array) {
    dayMenu.push(areaArray.split(","));
  }
   
  cardArray.push(dayMenu.filter((e) => dayMenu.indexOf(e) % 2  === 1 && dayMenu.indexOf(e) !== 0));
  areaArray.push(dayMenu.filter((e) => dayMenu.indexOf(e) % 2  === 0 && dayMenu.indexOf(e) !== 0));

  cardDistribution();
}

//カード割り当て
let dayCounter = 0;

function cardDistribution() {
  const cardClass = document.getElementsByClassName("card");
  const cardClassLength = cardClass.length;
  const dayLength = cardArray[0].length;
  dayCounter = (dayCounter + 1) % dayLength;
  const todayCards = cardArray[0][dayCounter].concat();
  
  const situation = document.getElementsByClassName("situation");
 
  todayCards.splice(0, 1);
  const cardsLength = todayCards.length;
  let number = cardsLength;
  
  randomCards.length = 0;
  for (let i = 0; i < cardsLength; i++) {
    const randomNumber = random(number);
    randomCards.push(todayCards[randomNumber]);
    number = number - 1;
    todayCards.splice(randomNumber,1);
  }

  for (let i = 0; i < cardClassLength; i++) {
    const cardId = document.getElementById(`card${i + 1}`);
    const card = randomCards[i];
    cardId.textContent = card;
  }
  todayLeadar();
}

const cardButtonDown = document.getElementById("new-card-button");
cardButtonDown.addEventListener("click", cardDistribution);

//link挿入
const inputLink = document.getElementById("link-file")

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
