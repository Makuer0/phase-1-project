
const countryvalue = document.getElementById("values");
const submition = document.getElementById('submit');
const nameInput = document.getElementById("countries");

submition.addEventListener("click", ()=>{
    
    const name = nameInput.value.toLowerCase();  

fetch(`https://restcountries.com/v3.1/name/${name}`).then(response =>
   response.json()
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
    countryvalue.innerHTML = '';
    
    countryvalue.innerHTML = `
    <img src = " ${data[0].flags.svg}" class="flag-img">
    <h2>${data[0].name.common}</h2>
    <div class = "wrapper">
     <div class = "data-wrapper">
         <h4>Capital:</h4>
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
           <span>${Object.values(data[0].languages).toString().split(',').join(',')} </span>
          </div>
         </div>    
    
    <button onclick = "fetchCountry()">Random</button>

    `
    console.log(data);
    nameInput.value = '';
    Appearance(toggleSwitch.checked);
    }


const toggleSwitch = document.querySelector(".switch input");

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

    nameInput.style.borderBottom = isDarkMode ? '2px solid 	#383838' : "";
    submition.style.backgroundColor = isDarkMode ? "	#383838" : "";
    submition.style.color = isDarkMode ? "white" : "";
}



function fetchCountry(){

    fetch(`https://restcountries.com/v3.1/all`)
    .then(res => res.json())
    .then(data =>{
        const RandomCOuntry = data[Math.floor(Math.random() * data.length)];
        renderData([RandomCOuntry]);
    })


}
