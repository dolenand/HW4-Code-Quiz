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
function ResultsForm(sec) {
    var form1;
    var inpit1;
    ClearCard();
    var tagH = document.createElement("h2");
    tagH.innerHTML = "All done!";
    document.querySelector(".topPart").appendChild(tagH);
    tagH = document.createElement("h4");
    tagH.innerHTML = "Your final score:" + sec;
    document.querySelector("#quizID").appendChild(tagH);
    form1 = document.createElement("form");
    form1.id = "form1";
    form1.method = "POST";
    document.querySelector("#quizID").appendChild(form1);
    tagH = document.createElement("label");
    tagH.innerText = "Enter initials:";
    form1.appendChild(tagH);
    input1 = document.createElement("input");
    input1.type = "text";
    input1.placeholder = "your initials please!";
    input1.id = "input1";
    form1.appendChild(input1);
    tagH = document.querySelector("span.time");
    tagH.textContent = "";
    clearInterval(timerInterval);
    //When Form Submit
    form1.addEventListener("submit", function (event) {
        event.preventDefault();

        var text1 = inpit1.value.slice(0, 4);
        //Return from function early if submitted text is blank
        if (text1 === "") {
            alert("Enter initials!")
            return;
        }

        var localRes = {
            "name": "",
            "time": 0,
            "quiz": []
        }
        //retrive results from storage
        var storedResults = JSON.parse(localStorage.getItem("results"));
        //If todos are recieved from local storage, update todos array
        if (storedResults !== null) {
            results = storedResults;
        }
        //Results according to time spent
        while (ii >= 0) {
            if (sec > results[ii].time) {
                results[ii + 1].name = results[ii].name;
                results[ii + 1].time = results[ii].time;
                results[ii + 1].quiz = results[ii].quiz;
                results[ii].name = text1;
                results[ii].time = sec;
                results[ii].quiz = quizUserReply;
            }
            ii--;
        }

        ClearCard();
        tagH = document.createElement("h2");
        tagH.innerHTML = "Highscores";
        // Stored updated results in localStorage, re-render the list
        storeResults();
        renderResults();
    });
}

function renderResults() {
    //Displaying results in list form where user can edit details
    // click initals see test report
    var list1;
    var tagG = document.createElement("h2");
    tagG.textContent = "Highscores";
    tagG.setAttribute("class", "ceneter-align");
    document.querySelector(".topPart").appendChild(tagG);
    //Restore defualts
    secondsLeft = 75
    ResultTime = 0;
    pos = 0;
    quizUserReply = [];
    quesNum = 0;


    tagG = document.createElement("button");
    tagG.textContent = "Start test";
    tagG.setAttribute("class", "btn");
    tagG.addEventListener("click", generateQuiz);
    document.querySelector(".bottomPart").appendChild(tagG);

    list1 = document.createElement("ul")
    list1.id = "list1";
    list1.style.listStyleType = "none";
    document.querySelector("#quizID").appendChild(list1);
    var tag1;
    var tag2;
    //Render new list for each results

    resLength = results.length;
    for (var i = 0; i < results.length; i++) {
        var name = results[i].name;
        var time = results[i].time;
        var quiz = results[i].quiz;
        var li = document.createElement("li");

        li.setAttribute("data-index", i);
        list1.appendChild(li);
        tag1 = document.createElement("div");
        tag1.setAttribute("class", "row");
        li.appendChild(tag1);

        tag2 = document.createElement("div");
        tag2.setAttribute("class", "col-9");
        tag1.appendChild(tag2);
        var nameA = document.createElement("h5");
        nameA.textContent = name;
        nameA.setAttribute("data-toggle", "modal");
        nameA.setAttribute("data-target", "#myModal");
        nameA.style.flexWrap = "wrap";
        tag2.appendChild(nameA);

        tag2 = document.createElement("div");
        tag2.setAttribute("class", "col-1");
        tag1.appendChild(tag2);
        nameA = document.createElement("p");
        nameA.style.flexWrap = "wrap";
        nameA.textContent = time;
        tag2.appendChild(nameA);

        tag2 = document.createElement("div");
        tag2.setAttribute("class", "col-2");
        tag1.appendChild(tag2);
        var button = document.createElement("button");
        button.setAttribute("class", "smButton");
        button.textContent = "Erase";
        tag2.appendChild(button);
    }
    //When List1 element is clicked
    list1.addEventListener("click", function (event) {
        var element = event.target;
        var index = element.parentElement.parentElement.parentElement.getAttribute("data-index");
        // If that element is a button...
        if (element.matches("button") === true) {
            // Get its data-index value and remove the element from the list
            results.splice(index, 1);
            // Store updated results in localStorage, re-render the list
            storeResults();
            ClearCard();
            renderResults();
        }
        if (element.matches("h5") === true) {
            // Get the modal that arrange detailed answers view of the test for the chosen test results
            resultsModalShow(index);
        }
    });

}
//Highscores click from the menu
function init() {
    var storedResults = JSON.parse(localStorage.getItem("results"));
    clearInterval(timerInterval);
    ClearCard();

    if (storedResults !== null) {
        results = storedResults;
    }
    renderResults();
}

function storedResults() {
    //stringify and sedn to local storage
    localStorage.setItem("results", JSON.stringify(results));
}
//Make test results into visible format 
function resultsModalShow(x) {
    var tagNew;
    document.querySelector("#testresults").innerHTML = '';
    document.querySelector(".modal-title").innerHTML = "Test results for: " + results[x].name + ". Time left :" + results[x].time + " seconds";
    for (var i = 0; i < quizQuestions.length; i++) {
        tagNew = document.createElement("H3");
        tagNew.textContent = (i + 1) + ". Question  " + quizQuestions[i].question;
        document.querySelector("#testresults").appendChild(tagNew);
        tagNew = document.createElement("H4");
        tagNew.textContent = "Correct answer: " + quizQuestions[i].right;
        document.querySelector("#testresults").appendChild(tagNew);
        tagNew = document.createElement("H4");
        tagNew.textContent = results[x].name + "'s answer: " + results[x].quiz[i];
        if (quizQuestions[i].right != results[x].quiz[i]) {
            tagNew.style.textDecoration = "line-through";
        }
        document.querySelector("#testresults").appendChild(tagNew);
    }
}

function ClearCard() {
    var tagH = document.getElementsByTagName("h2")[0];
    tagH.parentNode.removeChild(tagH);
    var tagH = document.querySelector("#quizID");
    tagH.innerHTML = "";
    var tagH = document.querySelector(".bottomPart");
    tagH.innerHTML = "";
}

//generatequiz, start timer
function generateQuiz() {
    var timeEl = document.querySelector(".time");
    function setTime() {
        timerInterval = setInterval(function () {
            secondsLeft--;
            timeEl.textContent = secondsLeft;
            if ((secondsLeft === 0) && (ResultTime ===0)) {
                clearInterval(timerInterval);
                sendMessage();
            }
            if ((ResultTime !== 0) || (secondsLeft < 0)) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    //when user can't finish in time
    function sendMessage() {
        timeEl.textContent = " ";
        alert('Time runs out! Try again!');
        init();
    }
    setTime();
    var qSelect = new Question(quizQuestions[quesNum].answers, quizQuestions[quesNum].question, quizQuestions[quesNum].right);
    quesNum += 1;
    qSelect.questionOut();
}

var generateBtn = document.querySelector("#generate");

generateBtn.addEventListener("click", generateQuiz);

