
const countryvalue = document.getElementById("values");
const submition = document.getElementById('submit');
const nameInput = document.getElementById("countries");
const randomBtn = document.getElementById("random");

const answer = document.querySelector("#answer");
const timerElement = document.getElementById("timer"); 
const startButton = document.getElementById("startQuiz");
//const answerElement = document.getElementById("answer");
const optionsElement = document.getElementById("options");
const flagElement = document.getElementById("flag");   




let correctAnswer = ""; 
let allCountries = [];
let totalAttempts = 0;  
let correctAnswers = 0; 
let timeLeft = 30
let timer;

submition.addEventListener("click", ()=>{

    const name = nameInput.value.toLowerCase();  

fetch(`https://restcountries.com/v3.1/name/${name}`)
.then(response => response.json()
).then(data => {
    renderData(data);

}
)
}
);

function renderData(data){

if(!data || !Array.isArray(data)||data.length === 0 || !data[0].name){

    countryvalue.innerHTML = `<p style = "color:red;">
    Invalid Country data</p>`
    return;
}
   // countryvalue.innerHTML = '';
    
    countryvalue.innerHTML = `
    <img src = " ${data[0].flags.svg}" class="flag-img">
    <h2>${data[0].name.common}</h2>
    <div class = "wrapper">
     <div class = "data-wrapper">
         <h4>Capital-City:</h4>
         <span>${data[0].capital}</span>
        </div>
    </div>
    
    <div class = "wrapper">
     <div class = "data-wrapper">
         <h4>Continent:</h4>
         <span>${data[0].continents}</span>
        </div>
    </div>
    
    <div class = "wrapper">
         <div class = "data-wrapper">
          <h4>Population:</h4>
           <span>${data[0].population}</span>
          </div>
         </div>
    
    <div class = "wrapper">
         <div class = "data-wrapper">
          <h4>Currency:</h4>
           <span> ${data[0].currencies ? `${data[0].currencies[Object.keys(data[0].currencies)]?.name} - ${Object.keys(data[0].currencies)[0]} `: "N/A"}</span>
          </div>
         </div>
    
     <div class = "wrapper">
         <div class = "data-wrapper">
          <h4>Common-Language:</h4>
           <span>${Object.values(data[0].languages).join(',')} </span>
          </div>
         </div>    
       <button onclick = "fetchCountry()" id="random">Random</button>

    `
    console.log(data);
    nameInput.value = '';
   Appearance(toggleSwitch.checked);


    }


let toggleSwitch = document.querySelector(".switch input");

toggleSwitch.addEventListener("change", function () {
    Appearance(toggleSwitch.checked); 
});

function Appearance(isDarkMode) {
    document.querySelectorAll("h2, h4, span").forEach(ele => {
        ele.style.color = isDarkMode ? "white" : "";
    });

    document.querySelector(".container").style.backgroundColor = isDarkMode ? "#505050" : "";
    document.body.style.backgroundColor = isDarkMode ? "	#383838" : "";
    document.body.style.color = isDarkMode ? "white" : "";
    nameInput.style.borderBottom = isDarkMode ? '2px solid   	#383838' : "";
   document.querySelectorAll("button").forEach((button)=>{
    button.style.backgroundColor = isDarkMode ? "	#383838" : "";
   })

}

function startTimer() {
    timeLeft = 30;
    totalAttempts = 0;
    correctAnswers = 0;
    answer.innerHTML = "";
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer); 
            endQuiz(); 
        }
    }, 1000);

    generateFlagQuiz();
}




document.getElementById("startQuiz").addEventListener("click", startTimer);

function startQuiz() {
    correctAnswers = 0;
    totalAttempts = 0;
    answer.innerHTML = "";
    startTimer();
    generateFlagQuiz();
}

function endQuiz() {
    optionsElement.innerHTML = "";
    flagElement.src = ""; 
    answer.style.color = "blue";
    answer.innerHTML = `⏳ Time's up! You got ${correctAnswers} out of ${totalAttempts} correct.`;
}


function fetchCountry(){

    fetch(`https://restcountries.com/v3.1/all`)
    .then(res => res.json())
    .then(data =>{
        const RandomCOuntry = data[Math.floor(Math.random() * data.length)];
        renderData([RandomCOuntry]);
    })


}

async function getRandomCountry() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    const randomCountry = countries[Math.floor(Math.random() * countries.length)]; 

    return { country: randomCountry, allCountries: countries };
}


async function generateFlagQuiz() {
    try {
        const { country, allCountries } = await getRandomCountry();

        if (!country || !country.flags || !country.flags.svg) {
            console.error("Invalid country data:", country);
            return generateFlagQuiz();
        }

        console.log("Country for quiz:", country);
        console.log("All countries list:", allCountries);

        flagElement.src = country.flags.svg;
        correctAnswer = country.name.common;

        generateOptions(allCountries);
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}

function generateOptions(allCountries) {
    if (!Array.isArray(allCountries) || allCountries.length === 0) {
        console.error("Invalid country list:", allCountries);
        return;
    }

    let options = [correctAnswer];

    while (options.length < 4) {
        let randomIndex = Math.floor(Math.random() * allCountries.length);
        let randomCountry = allCountries[randomIndex]?.name?.common;

        if (randomCountry && !options.includes(randomCountry)) {
            options.push(randomCountry);
        }
    }

    options.sort(() => Math.random() - 0.5);

    document.getElementById("options").innerHTML = options
        .map(option => `<button onclick="checkAnswer('${option}')">${option}</button>`)
        .join("");
}

function checkAnswer(selected) {
    totalAttempts++; 
    if (selected === correctAnswer) {
        correctAnswers++;
        answer.style.color = "rgb(13, 185, 50)";
        answer.innerHTML = `${correctAnswer} Correct! `;
    } else {
        answer.style.color = "red";
      answer.innerHTML = `Wrong! The correct answer is ${correctAnswer}`;
    }
 
    
    if (timeLeft > 0) {
        generateFlagQuiz();
        generateOptions();
    }
}



