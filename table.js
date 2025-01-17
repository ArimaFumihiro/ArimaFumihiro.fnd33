'use strict'

const tbody = document.getElementById("table-body")
const column = 19;
const row = 11;
let count = 1;

for (let i = 0; i < row; i++) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr)
  for (let j = 0; j < column; j++) {    
    const td = document.createElement("td");
    td.className = "square";
    td.textContent = `${count}`;
    tbody.appendChild(td);
    count++;
  }
}
