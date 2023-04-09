const playBoard=document.querySelector('.play-board');
const scoreEl=document.querySelector('.score');
const highScoreEl=document.querySelector('.high-score');
const controlsEl=document.querySelectorAll('.controls i');

let foodX, foodY;
let snakeX=2, snakeY=15;
let velocityX=0, velocityY=0;
let snakeBody=[];
let gameOver=false;
let setIntervalID;
let score=0;

let highScore = localStorage.getItem('high-score') || 0;
highScoreEl.innerText= `High Score: ${highScore}`;

const changeFoodPosition = ()=>{
    foodX= Math.ceil(Math.random()*30);
    foodY= Math.ceil(Math.random()*30);
}

const handleGameOver=()=>{
    clearInterval(setIntervalID);
   alert('Game Over! Press OK to replay ...')  ;
   location.reload();
}

const changeDirection=(e)=>{
    
    if(e.key === "ArrowUp" && velocityY !=1)
    {
        velocityX=0;
        velocityY=-1;
    }
    else if(e.key === "ArrowDown" && velocityY !=-1)
    {
        velocityX=0;
        velocityY=1;
    }
    else if(e.key === "ArrowLeft" && velocityX !=1)
    {
        velocityX=-1;
        velocityY=0;
    }
    else if(e.key === "ArrowRight" && velocityX !=-1)
    {
        velocityX=1;
        velocityY=0;
    }
    initGame(); 
}

controlsEl.forEach(key=>{
    key.addEventListener('click',()=>changeDirection({key:key.dataset.key}));
})

const initGame= ()=>{
    if(gameOver) return handleGameOver();
    let htmlMarkup=`<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY)
    {
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;
        highScore=score > highScore ? score : highScore;
        localStorage.setItem('high-score', highScore)
        scoreEl.innerText= `Score: ${score}`;
    }

    for (let i = snakeBody.length-1; i > 0; i--)
     {
        snakeBody[i]=snakeBody[i-1]
     }

    snakeBody[0]=[snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;
    
    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30)
    {
        gameOver=true;
    }
    for (let i = 0; i < snakeBody.length; i++) 
    {
        htmlMarkup+=`<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`; 

        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
        {
            gameOver = true;
        }
    }

    playBoard.innerHTML=htmlMarkup;
}

changeFoodPosition();
setIntervalID= setInterval(initGame,125);   

document.addEventListener('keydown', changeDirection);