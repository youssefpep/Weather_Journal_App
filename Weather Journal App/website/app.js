/* API URL and Key */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
const keyAPI = ",&appid=6c2c9df7ee10bb060ce01e8f4f3a59a0&units=metric"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

//Variable that will store the value of the zip code retrieved from the API 


//Variable that stores an absolute URL to be added in the postData function
const myServer = "http://localhost:5000"; 

//On click function that will show the data retrieved from the API to the user on the web page after the button is clicked. 
document.getElementById('generate').addEventListener('click', () => {
    const zipCode = document.getElementById("text-field").value;
    const customerFeelings = document.getElementById("text-field2").value; 
    getCountryByZip(zipCode).then(function (data){

        const retrievedInfo = {
            newDate: newDate,
            feeling: customerFeelings,
            temp: data.main.temp, 
            city: data.name, 
            description: data.weather[0].description
        }; 
        postData(myServer + "/add", retrievedInfo); 
        updateUI(); 

    });
});

//Definition of getCountryByZip function
const getCountryByZip = async (zipCode) => {
    try {
        const response = await fetch (baseURL + zipCode + keyAPI);
        const data = await response.json(); 
        console.log(data); 
        return data; 
    }catch (error){
        console.log("error", error); 
    }
};

//Definition of postData function
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch (url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(data), 
    }); 
    try {
        const newData = await response.json();
        console.log(newData);
        return newData; 
    }catch (error){
        console.log("error", error); 
    }
}

const updateUI = async () => {
    const request = await fetch (myServer + '/all'); 
    try{
        const allData = await request.json(); 
        document.getElementById("temp").innerHTML = allData.temp + "&degC"; 
        document.getElementById("date").innerHTML = allData.newDate; 
        document.getElementById("city").innerHTML = allData.city; 
        document.getElementById("description").innerHTML = allData.description; 
        document.getElementById("feelings").innerHTML = allData.feeling; 
    }catch(error){
        console.log('error', error);
    }
}



