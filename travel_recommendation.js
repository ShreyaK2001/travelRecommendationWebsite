
const searchBtn = document.getElementById("search");
const clearBtn = document.getElementById("clear");
const overlay = document.getElementById("rec");
let recommendations = [];
let results =[];

searchBtn.addEventListener("click", fetchResults);
clearBtn.addEventListener("click", clearResults);

function fetchResults(){
    const keyword = document.getElementById("searchBar").value.toLowerCase();
    if(!keyword){
        alert("Please enter a keyword to search.");
        return;
    }

    fetch("travel_recommendation_api.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network was not okay!");
        }
        return response.json();
    })
    .then(data =>{
        let results =[];
        recommendations = data;

        const country = recommendations.countries.find(country => country.name.toLowerCase() === keyword);
    if(country){
        results = country.cities.map(city =>({
            name : city.name,
            imageURL : city.imageUrl,
            description : city.description
        }));
    }
    if(keyword === "temple"){
        results = recommendations.temples.map(tem =>({
            name: tem.name,
            imageURL : tem.imageUrl,
            description : tem.description
        }));
    }
    if(keyword === "beach"){
        results = recommendations.beaches.map(bea => ({
            name : bea.name,
            imageURL : bea.imageUrl,
            description : bea.description
        }));
    }

    displayResults(results);
    })
    .catch(error => {
        console.error("Error fetching JSON data: ", error);
        alert("Unable to fetch data. Please try again later");
    });
}


function displayResults(results){
    const resultsDiv = document.getElementById("rec");
    resultsDiv.innerHTML = "";

    if(results.length === 0){
        resultsDiv.innerHTML = "<p>No Results Found!</p>";
    }else{
        results.forEach(result => {
            const card = document.createElement("div");
            card.className = "result-card";

            card.innerHTML = `<img src="${result.imageURL}" alt ="City image"><br>
                              <h2>${result.name}</h2><br>
                              <p>${result.description}</p><br>
                              <button>Visit</button>`;
            resultsDiv.appendChild(card);
        });
    }
    resultsDiv.style.display = "block";
}

function clearResults(){
    document.getElementById('searchBar').value = "";
    document.getElementById('rec').innerHTML = "";
    document.getElementById('rec').style.display= "none";
}