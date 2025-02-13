const contactUsBtn = document.getElementById("contactUsBtn")
if(contactUsBtn){
contactUsBtn.addEventListener("click", function(event){
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    if(name && email && message){
    alert('Thank you for contacting us!')
    }
});
}


const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchPlace);

function searchPlace(){
    var searchInput = document.getElementById("searchBar").value.toLowerCase();
    if(searchInput === "country" || searchInput === "countries"){
        searchInput = "countries";
    }
    else if(searchInput === "temple" || searchInput === "temples"){
        searchInput = "temples";
    }
    else if(searchInput === "beach" || searchInput === "beaches"){
        searchInput = "beaches"
    }

    const resultsDiv = document.getElementById("resultsDiv");
    resultsDiv.innerHTML = '';
    
    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => { 
        if(data[searchInput]){
            if(searchInput === "countries"){
                data[searchInput].forEach(country => {
                    country.cities.forEach(city => {
                        const itemDiv = document.createElement("div");
                        itemDiv.innerHTML =
                        `<img src="${city.imageUrl}" alt="${city.name}" />
                        <h3 id="cityname">${city.name}</h3>
                        <p id="citydescription">${city.description}</p>`;
                        resultsDiv.appendChild(itemDiv);
                    });
                });
            }
            else{
                data[searchInput].forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.innerHTML =
                        `<img src="${item.imageUrl}" alt="${item.name}" />
                        <h3 id="itemName">${item.name}</h3>
                        <p id="itemDescription">${item.description}</p>`;
                        resultsDiv.appendChild(itemDiv);
            });
        }
        }
        else{
            alert("No matching results found");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultsDiv.innerHTML = 'An error occurred while fetching data.';
    });

}
