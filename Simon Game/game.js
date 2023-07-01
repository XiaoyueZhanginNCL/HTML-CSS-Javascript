var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];//记录AI顺序

var userClickedPattern=[];//记录用户点击顺序

var started = false;

var level=0;



$(document).on("keypress",function(){
    if(!started){ 
     nextSequence();
     started = true;
    }
 
 });


function nextSequence() { //产生下个随机数并记录

    level++;

    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//按钮闪烁效果

    playSound(randomChosenColour);
    
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("sucess");
    }else{
        animateGameOver();
        reset();
        

    }
    if(currentLevel === level-1 && level!==0){
        userClickedPattern=[];
        setTimeout(nextSequence,2000); 
     }
 }
    


$(".btn").click( function(){ //用户点击
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

})




function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");

    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function animateGameOver(){
    $("body").addClass("game-over");

    var audio=new Audio("sounds/wrong.mp3");
    audio.play();

    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
    
}

function reset(){
    level=0;
    started=false;
    $("h1").text("Press A Key to Start");
    gamePattern=[];
    userClickedPattern=[];
}