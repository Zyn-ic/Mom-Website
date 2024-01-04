function othersection(num, numm){
    
    //visible and invisible stuff
    document.querySelector(".products-section").style.display = 'none';
    document.querySelector(".receipt").style.display = "block";

    //make the X acutally clickable
    xImage = document.getElementById('xImage');
    var index = 0;

    xImage.addEventListener('click', function() {
        document.querySelector(".products-section").style.display = 'flex';
        document.querySelector(".receipt").style.display = "none";
        index = null;
    });

    //set info
    document.querySelector(".name").innerHTML = formattedPages[numm]["items"][num].name;
    document.querySelector(".price").innerHTML = formattedPages[numm]["items"][num].price;
    document.querySelector(".description").innerHTML = "Description: "+ formattedPages[numm]["items"][num].description;

    const ingredientsList = document.querySelector('.ingredients');

    // Remove existing list items
    ingredientsList.innerHTML = '';

    // Add new list items from the array
    formattedPages[numm]["items"][num].ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });

    const tagsContainer = document.querySelector('.tags');

    // Remove all existing tags
    tagsContainer.innerHTML = '';

    // Create and add new tags based on the array
    formattedPages[numm]["items"][num].tags.forEach(tagText => {
        const newTag = document.createElement('span');
        newTag.className = 'tag';
        newTag.textContent = tagText;
        tagsContainer.appendChild(newTag);
    });


    function handle1(){
        if (formattedPages[numm]["items"][num]["bottle-sizes"]["16oz"] == null){
        return document.querySelector(".price").innerHTML = "Not available";
         
        }

        document.getElementById('b1').style.backgroundColor = "#62445F";
        document.getElementById('b2').style.backgroundColor = "#181A1B";
        document.getElementById('b3').style.backgroundColor = "#181A1B";
        document.querySelector(".price").innerHTML = (formattedPages[numm]["items"][num].price + (formattedPages[numm]["items"][num]["bottle-sizes"]["16oz"]));
    }

    function handle2(){
        if (formattedPages[numm]["items"][num]["bottle-sizes"]["24oz"] == null){
        return document.querySelector(".price").innerHTML = "Not available";
         
        }

        document.getElementById('b1').style.backgroundColor = "#181A1B";
        document.getElementById('b2').style.backgroundColor = "#62445F";
        document.getElementById('b3').style.backgroundColor = "#181A1B";
        document.querySelector(".price").innerHTML = (formattedPages[numm]["items"][num].price + (formattedPages[numm]["items"][num]["bottle-sizes"]["24oz"]));
    }

    function handle3(){
        if (formattedPages[numm]["items"][num]["bottle-sizes"]["32oz"] == null){
        return document.querySelector(".price").innerHTML = "Not available";
         
        }

        document.getElementById('b1').style.backgroundColor = "#181A1B";
        document.getElementById('b2').style.backgroundColor = "#181A1B";
        document.getElementById('b3').style.backgroundColor = "#62445F";
        document.querySelector(".price").innerHTML = (formattedPages[numm]["items"][num].price + (formattedPages[numm]["items"][num]["bottle-sizes"]["32oz"]));
    }

    // handle button clicks
    document.getElementById('b1').addEventListener('click', handle1);
    document.getElementById('b2').addEventListener('click', handle2);
    document.getElementById('b3').addEventListener('click', handle3);

    //put in image

    if (formattedPages[numm]["items"][num]["bottle-sizes"]["32oz"] != null){
        document.getElementById('b1').style.backgroundColor = "#181A1B";
        document.getElementById('b2').style.backgroundColor = "#181A1B";
        document.getElementById('b3').style.backgroundColor = "#62445F"; 
    }

    if (formattedPages[numm]["items"][num]["bottle-sizes"]["24oz"] != null){
        document.getElementById('b1').style.backgroundColor = "#181A1B";
        document.getElementById('b2').style.backgroundColor = "#62445F";
        document.getElementById('b3').style.backgroundColor = "#181A1B"; 
    }

    if (formattedPages[numm]["items"][num]["bottle-sizes"]["16oz"] != null){
        document.getElementById('b1').style.backgroundColor = "#62445F";
        document.getElementById('b2').style.backgroundColor = "#181A1B";
        document.getElementById('b3').style.backgroundColor = "#181A1B";  
    }
}



function loadPage(num){
    console.log(num);

    // Find the element with "alt" attribute equal to "Product1"

    
    var cards = document.querySelectorAll(".product");
    var tohide = 6 - formattedPages[num-1]["items"].length;
    console.log(formattedPages[num-1]["items"]);

    for (let index = 0; index < 6; index++) {
        cards[index].style.display = "block";
    }

    if (tohide > 0 && tohide < 7) {
        for (let index = 5 ; index >= 6 - tohide; index--) {
            cards[index].style.display = "none";
            console.log(index)
        }
    }
    
    for (let index = 0; index < formattedPages[num-1]["items"].length; index++) {
        cards[index].querySelector("h3").innerHTML = formattedPages[num-1]["items"][index].name;
        cards[index].querySelectorAll("p")[0].innerHTML = formattedPages[num-1]["items"][index].description;
        cards[index].querySelectorAll("p")[1].innerHTML = "$" + formattedPages[num-1]["items"][index].price;

        cards[index].querySelector("button").onclick = function(){
            othersection(index, num -1);
        }
    }
}

