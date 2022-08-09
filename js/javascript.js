function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

// Set current time to the users browser
const time = new Date();
let currTime = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
document.getElementById("currentTime").innerHTML = currTime;

       // Get todays date for diplaying scripture
       var today = new Date();
       var year = today.getFullYear();
       var month = today.getMonth()+1;
       var dia = today.getDate();
       var currentDate =year+"-"+month+"-"+dia;

let currentImageDate = "2022-8-8";

//Store username in local storage
if (!localStorage.getItem('name')) {
  let person = prompt("Please enter your name", "e.g Boaz the Shoe Height");
  person = sanitize(person);
  localStorage.setItem('name', person); 
}

let userName = localStorage.getItem('name');
let gradient = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)),";

// Fetching images from pexels
let bgImage = "";

if(currentImageDate !== currentDate){
  localStorage.removeItem('storeBgImage');
}

function getPhotos(images) {
  bgImage = images[Math.floor(Math.random() * images.length)];
  bgImage = bgImage.src.original;

  localStorage.setItem('storeBgImage', bgImage);

  if (localStorage.getItem('storeBgImage')) {
    bgImage.onload = document.body.style.backgroundImage = gradient + "url('" + bgImage + "')";
  } else {
    document.body.style.backgroundImage = gradient + "url(/images/car.jpg)";
  }
}

if (localStorage.getItem('storeBgImage') == null) {

      let searchQuery = ["landscape", "forest", "nature"];
      searchQuery = searchQuery[Math.floor(Math.random() * searchQuery.length)];

      fetch("https://api.pexels.com/v1/search?query=" + searchQuery,{
        headers: {
          Authorization: "563492ad6f9170000100000177127c3639534dd19f6d1a0be573c7d1"
        }
      })
        .then(resp => {
          return resp.json()
        })
        .then(data => {
          getPhotos(data.photos)
        })
        .catch(error => {
          // The resource could not be reached, no internet
          document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(/images/car.jpg)";
          });
          // advance to current date
          currentImageDate = currentDate;

  
  }  

// Load scriptures from JSON and manipulate them
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let data = JSON.parse(xhttp.responseText);
       let scripture = data.scripture;

       let output = "";

       for (let i = 0; i < scripture.length; i++) {
           if (scripture[i].date === currentDate) {
                output = scripture[i].verse;
                document.getElementById("userScripture").innerHTML = output;

           }
       }
    }
};
xhttp.open("GET", "/js/data.json", true);
xhttp.send();




// Get current time, check whether it's am or pm and display the greeting
const date = new Date();
let amPm = date.getHours();
let userGreeting = document.getElementById("greeting");

let greeting = "";

if (amPm >= 12 && amPm <= 17) {
    greeting = "Good afternoon " + userName + ".";
} else if (amPm >= 18) {
    greeting = "Have a blessed evening, " + userName + ".";
} else {
    greeting = "Good Morning " + userName + ", here's your word for the day"
}

userGreeting.innerHTML = greeting;
