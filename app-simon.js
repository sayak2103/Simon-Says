let btn=document.querySelector("#start");
let boxes=document.querySelectorAll(".inner-box");
let subH=document.querySelector("#subH");
let outBox=document.querySelector(".outer-box");
let scr=document.querySelector("#score");
let instr=document.querySelector("#ins");
const color=["one","two","three","four"];
let level=0;
let n;
let arr=[];
let current=0;
let input=false;
let gmover;
let score=0;
let time;

function blink(i){
    if(i>5)
    time=350;
    else 
    time=500;
let b=setInterval( ()=> {
    boxes[arr[i]].classList.toggle('blink');
},time);
setTimeout( ()=>{
    if(i<level-1)
    {blink(i+1);}
    else
    {input=true;}
    clearInterval(b);
},(2*time));
}

function nextLevel(){
    input=false;
    n=Math.floor(Math.random()*4);
    arr.push(n);
    level++;
    scr.innerText=`${score}`;
    instr.innerText=`here comes level ${level}`;
    subH.innerText=`LEVEL : ${level}`;
    blink(0);
    current=0;
}

function gameOver(){
    instr.innerHTML='<b>game over !!!! Start Again </b>';
    gmover=setInterval(function(){
        outBox.classList.toggle('blink-red');
    },300);
    subH.innerText=`Click To Start`;
    btn.classList.remove('remove');
    for(let i=1;i<=level;i++)
    arr.pop();
    level=0;
}

btn.addEventListener("click",()=>{
    btn.classList.add('remove');
    score=0;
    clearInterval(gmover);
    outBox.classList.remove('blink-red');
    nextLevel();
});

outBox.addEventListener("click",function(event){
    if(input){
        boxes[color.indexOf(event.target.id)].classList.toggle('blink');
        let b=setInterval( ()=> {
            boxes[color.indexOf(event.target.id)].classList.toggle('blink');
        },250);
        setTimeout( ()=>{
            clearInterval(b);
        },251);
        console.log(event.target.id);
        if(event.target.id==color[arr[current]]){
            current++;
            score++;
            console.log(true);
            if(current==level)
            {
                subH.innerHTML="good jod !!!"
                setTimeout(()=>{
                    nextLevel();
                },750);
            }
        
        }
        else{
            gameOver();
            input=false;
        }
    }
});