let screen = document.getElementById("screen");
let isDegree = true;

// BUTTON PRESS
function press(val){
playSound();

if(val === "AC"){
screen.value = "";
return;
}

if(val === "DEL"){
screen.value = screen.value.slice(0,-1);
return;
}

screen.value += val;
}

// TOGGLE DEG/RAD
function toggleMode(){
isDegree = !isDegree;
document.getElementById("mode").innerText = isDegree ? "DEG" : "RAD";
}

// CALCULATE
function calculate(){
try{
let exp = screen.value;

// Replace symbols
exp = exp.replace(/π/g, "Math.PI");
exp = exp.replace(/e/g, "Math.E");
exp = exp.replace(/√/g, "Math.sqrt");
exp = exp.replace(/\^/g, "**");

// Functions
exp = exp.replace(/sin\(([^)]+)\)/g, (_, x) =>
isDegree ? `Math.sin(${x} * Math.PI / 180)` : `Math.sin(${x})`
);

exp = exp.replace(/cos\(([^)]+)\)/g, (_, x) =>
isDegree ? `Math.cos(${x} * Math.PI / 180)` : `Math.cos(${x})`
);

exp = exp.replace(/tan\(([^)]+)\)/g, (_, x) =>
isDegree ? `Math.tan(${x} * Math.PI / 180)` : `Math.tan(${x})`
);

exp = exp.replace(/log\(/g, "Math.log10(");
exp = exp.replace(/ln\(/g, "Math.log(");

// Factorial
exp = exp.replace(/(\d+)!/g, (_, n) => factorial(n));

// Auto close brackets
let open = (exp.match(/\(/g) || []).length;
let close = (exp.match(/\)/g) || []).length;
while(open > close){
exp += ")";
close++;
}

screen.value = eval(exp);

}catch{
screen.value = "Error";
}
}

// FACTORIAL FUNCTION
function factorial(n){
n = parseInt(n);
if(n < 0) return "Error";
let f = 1;
for(let i=1;i<=n;i++) f*=i;
return f;
}

// KEYBOARD SUPPORT
document.addEventListener("keydown", function(e){
if((e.key >= "0" && e.key <= "9") || "+-*/().".includes(e.key)){
press(e.key);
}
if(e.key === "Enter") calculate();
if(e.key === "Backspace") press("DEL");
});

// SOUND EFFECT
function playSound(){
let audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
audio.play();
}