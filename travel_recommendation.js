
const searchBtn = document.getElementById('search');
const clearBtn = document.getElementById('clear');
const keyword = document.getElementById('searchBar').value.toLowerCase();
const overlay = document.getElementById('rec');
let recommendations = [];
let results =[];

fetch('travel_recommendation.json')
.then(response => response.json())
.then(data =>{
    recommendations = data;
})
.catch(error => console.error("Error fetching json data", error));


function displayRec(keyword){
    
    const country = recommendations.countries.find(country => country.name)
}