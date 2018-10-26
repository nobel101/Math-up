//javascript.js
let playing;
playing= false;
let score;
let action;
let timeremaining;
let correctAnswer;
let Level;
let roundScore;

//if we click on the start/reset
document.getElementById("startReset").onclick = function(){
    
    //if we are playing

    if (playing != true) {//if we are not playing

        //change mode to playing

        playing = true;

        //set score to 0

        score = 0;
        level = 1;
        roundScore = [];
        document.getElementById("scorevalue").innerHTML = score;

        //show countdown box

        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        //hide game over box

        hide("gameOver");

        //change button to reset
        document.getElementById("startReset").innerHTML = "Reset Game";

        //start countdown

        startCountdown();

        //generate a new Q&A

        generateQA();
    } else {

        location.reload(); //reload page

    }

}

//Clicking on an answer box

for(let i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing     
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
        //correct answer
            
            //increase score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
              if(score === 10){
                  document.getElementById("levelValue").innerHTML = level++;
                  timeremaining = 60;
                  score = 0;

              }
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
            
            //Generate new Q&A
            
            generateQA();
        }else{
        //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
            generateQA();   //this line get you the next question when you got a wrong answer
            timeremaining -=10;  //when you got a wrong answer the timer will decrease by 10 sec
        }

    }
}


}
//if we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box for 1sec


//functions

//start counter

function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining <= 0){// game over
            stopCountdown();
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    }, 1000);    
}

//stop counter

function stopCountdown(){
    clearInterval(action);   
}

//hide an element

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//show an element

function show(Id){
    document.getElementById(Id).style.display = "block";   
}

//generate question and multiple answers

function generateQA(){
    let x = 1+ Math.round(9*Math.random());
    let y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    let correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    let answers = [correctAnswer];
    
    for(let i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer

            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}