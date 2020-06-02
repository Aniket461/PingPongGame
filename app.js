class Vec {
    constructor(x = 0, y= 0){

        this.x = x;
        this.y = y;
    }
}





class Rect{

    constructor( w, h){
        this.pos = new Vec;
        this.size = new Vec(w,h);
    }


    get left(){
        return this.pos.x - this.size.x / 2;
    }
    get right(){
        return this.pos.x + this.size.x / 2;
    }
    get top(){
        return this.pos.y - this.size.y / 2;
    } 
    get bottom(){
        return this.pos.y + this.size.y / 2;
    }
    
    
}

class Ball extends Rect{

    constructor(){

        super(10,10);
        this.vel = new Vec;
    }

}



class Player extends Rect {
    constructor(){
        super(20,100);
        this.score = 0;
    }
}

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const ball = new Ball;


let Lasttime;
function callback(millis){
    if(Lasttime){
        update((millis - Lasttime)/1000)
    }

    Lasttime = millis;
    requestAnimationFrame(callback);
}



players = [
    new Player, 
    new Player
];

players.forEach(player =>{
    player.pos.y = canvas.height/2;
    });
    
    players[0].pos.x = 10;
    players[1].pos.x = canvas.width - 10;



    
function collide(player, ball){

    if(player.left < ball.right && player.right > ball.left && player.top< ball.bottom  && player.bottom >ball.top){

        ball.vel.x = -ball.vel.x;


    }
}


    
function reset(){
    ball.pos.x = canvas.width/2;
ball.pos.y = canvas.height/2;

ball.vel.x = 0;
ball.vel.y = 0;


}

function start(){
    if(ball.vel.x === 0 && ball.vel.y === 0){

        ball.vel.x = 400;
        ball.vel.y = 400;

    }
}


function drawScore(){
    const align = canvas.width /3;

    const char_w = 10*4;
    players.forEach((player,index)=>{

        const chars = player.score.toString().split('');
        const offset = align *(index+1) - (char_w* chars.length /2) +
                        10/2;


        chars.forEach((char, pos)=>{

            context.drawImage(CHARS[char | 0],
                                        offset+pos*char_w,20);
        })

    });
}



function update(dt){
    ball.pos.x += ball.vel.x * dt;
    ball.pos.y += ball.vel.y * dt;

    

if(ball.left < 0 || ball.right >canvas.width){

    let playerid; 

        if(ball.vel.x < 0){
            playerid = 1;


        }
        else{
            playerid = 0;
        }
        players[playerid].score ++;
        console.log(playerid);
        reset();
   
}


if(ball.top < 0 || ball.bottom > canvas.height){
    ball.vel.y = -ball.vel.y;
}
 
players[1].pos.y = ball.pos.y;
context.fillStyle = '#F0F0BD';
context.fillRect(0,0,canvas.width, canvas.height);


context.fillStyle = '#F81C1C';
context.fillRect(ball.left, ball.top, ball.size.x,ball.size.y);




players.forEach(player=>{
    context.fillStyle = '#2B4899';
   context.fillRect(player.left, player.top, player.size.x,player.size.y);
});
drawScore();

players.forEach(player => {

collide(player, ball);

});

}



callback();

CHARS = [

    '111101101101111',
    '010010010010010',
    '111001111100111',
    '111001111001111',
    '101101111001001',
    '111100111001111',
    '111100111101111',
    '111001001001001',
    '111101111101111',
    '111101111001111'

].map(str =>{

    const canvas = document.createElement('canvas');
    canvas.height = 10*5;
    canvas.width = 10*3;

    const context = canvas.getContext('2d');
    context.fillStyle = '#000';

    str.split('').forEach((fill, i)=>{

        if(fill === '1'){
            context.fillRect((i%3)*10, (i/3 | 0)*10, 10,10);
        }

    });
    return canvas;

});



reset();




canvas.addEventListener('mousemove', event =>{

    players[0].pos.y = event.offsetY;

});


canvas.addEventListener('click', event =>{

start()
});