//Assign Variables and Test Questions

var secondsLeft = 75;
var ResultTime = 0;
var pos = 0;
var results = [];
var resLength = 0;
var timerInterval;
var quizQuestions = 0 [
    {
        "question": "Blah Blah Blah:",
        "answers": ["one", "two", "three"],
        "right": "four",
        "user": ""
    },
    {
        "question": "Blah Blah Blah:",
        "answers": ["one", "two", "three"],
        "right": "four",
        "user": ""
    },
    {
        "question": "Blah Blah Blah:",
        "answers": ["one", "two", "three"],
        "right": "four",
        "user": ""
    },
    {
        "question": "Blah Blah Blah:",
        "answers": ["one", "two", "three"],
        "right": "four",
        "user": ""
    },
    {
        "question": "Blah Blah Blah:",
        "answers": ["one", "two", "three"],
        "right": "four",
        "user": ""
    },
    {
        "question": "Blah Blah Blah:",
        "answers": ["one", "two", "three"],
        "right": "four",
        "user": ""
    }
];
var quizUserReply = [];
var quesNum = 0;

//Define class that retrives question from dataset, display it, and randomly place correct answer among options
class Question {
    constructor(a, q, c) {
        this.answer = a;
        this.question = q;
        this.correctanswer = c;
    }
    //Get
    get ask() {
        return this.questionOut();
    }
    //Method
    questionOut() {
        //Random Position for correct answer
        pos = Math.floor(Math.random() * (this.answers.length + 1));
        var order = 0;
        var TagH;
        //Clear Prev Input
        ClearCard();
        tagH = document.createElement("h2");
        tagH.innerHTML = this.question;
        document.querySelector(".topPart").appendChild(tagH);
        for (var i = 0; i < this.answers.length +1; i++) {
            tagH = document.createElement("button");
            if (i === pos) {
                tagH.innerHTML = (i + 1) + ". " + this.correctanswer;
            }
            else {
                tagH.innerHTML = (i + 1) + ". " + this.answers[order];
                order++;
            }
            //Click Handlers
            tagH.setAttribute("class", "btnAnswer");
            tagH.setAttribute("onClick", "answerClk(" + i + ")");
            document.querySelector("#quizID").appendChild(tagH);
        }    

        return true
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//Handle User Response; move to next question until completed, score sent to ResultsForm
function answerClk(n) {
    var str = "";
    var nn = 0;
    var tagNew = document.createElement("figure");
    tagNew.setAttribute("class", "NoteBelow");
    if (n === pos) {
        tagNew.innerHTML = "Correct";
    }
    else {
        tagNew.innerHTML = "Wrong";
        //wrong answer takes 10 seconds from timer
        secondsLeft -= 10;
    }
    document.querySelector(".bottomPart").appendChild(tagNew);
    tagNew = document.getElementsByClassName("btnAnswer");
    str = tagNew[n].innerHTML;
    nn = str.indexOf(".") + 2;
    str = str.slice(nn);
    quizUserReply.push(str);
    tagNew = document.querySelectorAll(".btnAnswer");
    for (var i = 1; i < tagNew.length; i++) {
        tagNew[i].style.opacity = 0.6;
        tagNew[i].onclick = '';
    }
    if (quesNum < quizQuestions.length) {
        var qSelect = new Question(quizQuestions[quesNum].answers, quizQuestion[quesNum].question, quizQuestions[quesNum].right);
        quesNum += 1;
        sleep(1000).then(() => { qSelect.questionOut(); }); //time in between questions
    }
    else {
        ResultTime = secondsLeft;
        ResultsForm(secondsLeft);
    }
}

//Results\Form gets user Initals and place results into array of text results from local storage
//Sorts by time left at quiz conclusion

