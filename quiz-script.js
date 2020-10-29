var questions=[];
questions = questionsbank.sort(() => Math.random() - 0.5);
tempQuestions=[]
for(var i=0;i<5;i++){
	tempQuestions.push(questions[i]);
}
questions=tempQuestions;
	console.log(questions)

var questionTimes=[];

var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;
console.log(totQuestions)
var date1=new Date()
var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var nextButton = document.getElementById('nextButton');
var resultCont = document.getElementById('result');
var user_name = sessionStorage.getItem("name");
var timetaken;

function loadQuestion (questionIndex) {
	if(questionIndex>0){
		date2=new Date()
		questionTimes.push( Math.abs(date1.getTime() - date2.getTime())/ 1000);
		date1=new Date();
	}
	console.log(questionTimes);
	try{
		var q = questions[questionIndex];
	
		questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
		opt1.textContent = q.option1;
		opt2.textContent = q.option2;
		opt3.textContent = q.option3;
		opt4.textContent = q.option4;
	}
	catch{

	}

};

function loadNextQuestion () {

	var selectedOption = document.querySelector('input[type=radio]:checked');
	if(!selectedOption){
		alert('Please select your answer!');
		return;
	}
	var answer = selectedOption.value;
	if(questions[currentQuestion].answer == answer){
		score += 1;
	}
	selectedOption.checked = false;
	currentQuestion++;
	if(currentQuestion == totQuestions - 1){
		nextButton.textContent = 'Finish';
	}
	loadQuestion(currentQuestion);

	if(currentQuestion == totQuestions){
		console.log(score)
		clearTimeout(countDown);
		timetaken=600-sec;
    	var mins = ~~((timetaken % 3600) / 60);
    	var secs = ~~timetaken % 60;
	    var ret = "";
    	ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    	ret += "" + secs;
		container.style.display = 'none';
		resultCont.style.display = 'block';
		resultCont.innerHTML=`            
		<h3>Name: ${user_name}</h3>
		<h3>Correct Answers: ${score}</h3>
		<h3>Incorrect Answer: ${currentQuestion-score}</h3>
		<h3>Time taken: ${ret}</h3>
		<h3>Time taken for question 1: ${questionTimes[0]}s</h3>
		<h3>Time taken for question 2: ${questionTimes[1]}s</h3>
		<h3>Time taken for question 3: ${questionTimes[2]}s</h3>
		<h3>Time taken for question 4: ${questionTimes[3]}s</h3>
		<h3>Time taken for question 5: ${questionTimes[4]}s</h3>`
		
		// resultCont.textContent = 'Name: '+user_name+"--------";
		// resultCont.textContent +='Marks: ' + score+"--------";

		// resultCont.textContent +=' Time: ' + ret;
		// return;

	}
}

loadQuestion(currentQuestion);