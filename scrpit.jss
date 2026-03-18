function calc(value){
document.getElementById("screen").value += value;
}

function calculate(){
try{
document.getElementById("screen").value =
eval(document.getElementById("screen").value);
}
catch{
alert("Invalid calculation");
}
}

function clearScreen(){
document.getElementById("screen").value = "";
}