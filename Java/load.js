function othersection(num, numm){
   document.querySelector(".products-section").style.display = 'none';
   document.querySelector(".receipt").style.display = "block";

    xImage = document.getElementById('xImage');
    var index = 0;

    xImage.addEventListener('click', function() {
        document.querySelector(".products-section").style.display = 'flex';
        document.querySelector(".receipt").style.display = "none";
        index = null;
    });


    document.querySelector(".name").innerHTML = formattedPages[numm]["items"][num].name;
    document.querySelector(".price").innerHTML = formattedPages[numm]["items"][num].price;
    document.querySelector(".description").innerHTML = formattedPages[numm]["items"][num].description;

    const ingredientsList = document.querySelector('.ingredients');

    // Remove existing list items
    ingredientsList.innerHTML = '';

    // Add new list items from the array
    formattedPages[numm]["items"][num].ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });

    function handle1(){
        if (formattedPages[numm]["items"][num]["bottle-sizes"]["16oz"] == null){
        return document.querySelector(".price").innerHTML = "Not available";
         
        }

        document.querySelector(".price").innerHTML = (formattedPages[numm]["items"][num].price + (formattedPages[numm]["items"][num]["bottle-sizes"]["16oz"]));
    }

    function handle2(){
        if (formattedPages[numm]["items"][num]["bottle-sizes"]["24oz"] == null){
        return document.querySelector(".price").innerHTML = "Not available";
         
        }

        document.querySelector(".price").innerHTML = (formattedPages[numm]["items"][num].price + (formattedPages[numm]["items"][num]["bottle-sizes"]["24oz"]));
    }

    function handle3(){
        if (formattedPages[numm]["items"][num]["bottle-sizes"]["32oz"] == null){
        return document.querySelector(".price").innerHTML = "Not available";
         
        }

        document.querySelector(".price").innerHTML = (formattedPages[numm]["items"][num].price + (formattedPages[numm]["items"][num]["bottle-sizes"]["32oz"]));
    }

    document.getElementById('1').addEventListener('click', handle1);
    document.getElementById('2').addEventListener('click', handle2);
    document.getElementById('3').addEventListener('click', handle3);
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

