console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    initialize();
    fetchDogData();
    })
// fetch to insert random dog images
 const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
 function fetchDogData(){
    fetch(imgUrl)
   .then(resp => resp.json())
   .then(data => insertDogData(data.message))
 }

// //function to insert random dog images
 function insertDogData(dogUrls){
     let imageContainer = document.getElementById('dog-image-container')
     dogUrls.map(function(url){
         let img = document.createElement('img')
         img.src = url;
         imageContainer.appendChild(img)
     })
    
 }

//fetch for dog breed drop down list
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
function fetchBreed(){
   fetch(breedUrl)
  .then(resp => resp.json())
  .then(data => insertDogBreed(Object.keys(data.message))) //returns an array
}


function initialize(){
    let dropdown = document.getElementById('breed-dropdown');
    if(dropdown.value === 'a'){
        dropdown.addEventListener('click', fetchBreed)
    }
    dropdown.addEventListener('change',fetchBreed)   
}

// function to filter dogs by breed.
function insertDogBreed(breeds){
    let dropdown = document.getElementById('breed-dropdown');
    let ul = document.getElementById('dog-breeds')
    //remove all children from ul
    function removeAllChildNodes(parent){
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }    
    removeAllChildNodes(ul);
    let selectedletter = dropdown.value;
    const filteredBreed = breeds.filter(function(breed){ // takes breeds and filters it down to just one breed
        return breed.substring(0,1) === selectedletter // takes breed and selects first letter at index 0
    }) 
    filteredBreed.map(function(breed){
        
        let li = document.createElement('li')
        li.innerHTML = breed;
        li.setAttribute('style', 'color: #000')
        li.addEventListener('mouseover', changeColorMagenta)
        li.addEventListener('mouseout', changeColorBlack)
        ul.appendChild(li)
        
        
    })

    function changeColorMagenta(e){
       e.target.style.color = 'magenta';  
    }
    function changeColorBlack(e){
        e.target.style.color = 'black';  
     }
    
}
