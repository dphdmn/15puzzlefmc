sm = document.getElementById('sm');
scr = document.getElementById('scr');
hd = document.getElementById('hd');
result1 = document.getElementById('result1');
result2 = document.getElementById('result2');
sol = document.getElementById('sol');
lab = document.getElementById('lab');
badsol = false;
sm.oninput = function(){
  if (sol.type == "text"){
    getRes();
  }
}

sol.oninput = function(){
  getRes();
}

function getRes(){
  let out = conec(sol.value,sm.value);
  if (out.length == 0){
    result2.innerHTML =  "<h1>Empty solution</h1>"
  }else{
    if (badsol){
      result2.innerHTML =  "<h1>Incorrect solution or setup move</h1>"
    }else{
  result2.innerHTML = "<h1>Solution for the original scramble</h1><h2><b>" + out + "</b></h2><h2>Moves: " + out.length + "</h2>";
  }}
}

scr.oninput = function(){
   if (scr.value != ""){
     hd.hidden = false;
     lab.style = "";
     sol.type = "text";
     news = tS(getDark(getScr(scr.value)));
     result1.innerHTML = "<h1><b>" +news + "</b></h1>";
   }
  else{
    doIfClosed();
  }
}

function clearShit(str1){
  str2 = str1;
  str2 = str2.replace(/R3|L3|D3|U3/g, s => s.substring(0,1)+s.substring(0,1)+s.substring(0,1));
  str2 = str2.replace(/R2|L2|D2|U2/g, s => s.substring(0,1)+s.substring(0,1));
  return str2;
}

function inverseShit(str1){
  str2 = str1;
  str2 = str2.split("").reverse().join("");
  str2 = str2.replace(/R/g,"0");
  str2 = str2.replace(/L/g,"1");
  str2 = str2.replace(/D/g,"2");
  str2 = str2.replace(/U/g,"3");
  str2 = str2.replace(/0/g,"L");
  str2 = str2.replace(/1/g,"R");
  str2 = str2.replace(/2/g,"U");
  str2 = str2.replace(/3/g,"D");
  return str2;
}

function getScr(str1){
str2 = str1.replace(/\//g, " ");
mas = str2.split(" ");
for (let i = 0; i<=15;i++){
  mas[i] = parseInt(mas[i]);
}
return mas;
}

function doIfClosed(){
   hd.hidden = true;
    sol.type = "hidden";
    lab.style="display:none";
    result1.innerHTML ="";
}

let unp = false;
function tS(mas){
  let st = mas.join(" ").replace(/([^ ]+ [^ ]+ [^ ]+ [^ ]+) /g, '$1/');
  let ar = st.match(/( 0).*\1/);
  if (unp){
    st = "Please, prepare scramble first (blank on right bottom)"; 
    doIfClosed();
  }
  if(!(ar===null)){
    st = "Sorry, your scramble is broken";
    doIfClosed();
  }
  return st;
}

function getDark(mas){
  unp = false;
  if(mas[mas.length-1] != 0){
    unp = true;
  }
  let newMas = [];
  for (let i = 0; i<=15;i++){
    newMas.push(mas.indexOf(i+1)+1);
  }
  return newMas;
}

function conec(sol,set){
  badsol=false;
  sol = sol.replace(/ /g,"");
  sol = clearShit(sol); 
  set = inverseShit(clearShit(set));
  let s = sol + set;
  let cop = s.slice(0);
  do{
    cop = s.slice(0);
    s = s.replace(/RL|LR|UD|DU/g,"");
   // console.log("before: " +cop);
   // console.log("after: " + s);
  }while(cop !== s); 
  check = [... "RULD"];
  s = s.replace(/(\w)\1\1\1/g,"ERROR");
  for (let i = 0; i<=s.length-1;i++){
    if (check.indexOf(s.charAt(i)) == -1){
       badsol=true;
       break;
    }
   
  }
  return inverseShit(s);
}
