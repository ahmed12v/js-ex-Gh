/// <reference types="../@types/jquery" />

///////////////////////// const ///////////////////////////
let row = document.getElementById("row");
let serch = document.getElementById("serch");
//////////////////////////////////////////////////////////////

$(document).ready(() => {

    searchByName("").then(() => {

        $(".loding").fadeOut(500)

        $("body").css("overflow", "visible")



    })
})
/////////////////////////////////////////////////////////////////////////////////////////////////

function openSidebar() {
    $(".sidebar-Links").animate({ left: 0 }, 500)




    $(".tab-icon").removeClass("fa-align-justify");

    $(".tab-icon").addClass("fa-x");


 
 }

function closeSidebar() {
    let boxWidth = $(".sidebar-Links .sidebar").outerWidth()

    $(".sidebar-Links").animate({left: -boxWidth}, 500)


    $(".tab-icon").addClass("fa-align-justify");

    $(".tab-icon").removeClass("fa-x");


    $(".links li").animate({top: 300}, 500)

}

closeSidebar()
$(".sidebar-Links i.open-close-icon").click(() => {

    if ($(".sidebar-Links").css("left") === "0px") {
        
        closeSidebar() 
    }
     else {


        openSidebar()

    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function displayMeals(arr) {

    let continer = "";

    for (let i = 0; i < arr.length; i++) {

        continer += `

        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>

        `
    }

    row.innerHTML = continer
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



async function getCategories() {

    row.innerHTML = ""

    $(".icon-loding").fadeIn(300)

    serch.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)

    response = await response.json()

    displayCategories(response.categories)

    $(".icon-loding").fadeOut(300)

}

function displayCategories(arr) {

    let continer = "";

    for (let i = 0; i < arr.length; i++) {

        continer += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>

        `
    }

    row.innerHTML = continer
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function getArea() {

    row.innerHTML = ""


    $(".icon-loding").fadeIn(300)

    serch.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)

    respone = await respone.json()

    console.log(respone.meals);

    displayArea(respone.meals)

    $(".icon-loding").fadeOut(300)

}


function displayArea(arr) {

    let continer = "";

    for (let i = 0; i < arr.length; i++) {

        continer += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>

        `
    }

    row.innerHTML = continer
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function getIngredients() {

    row.innerHTML = ""

    $(".icon-loding").fadeIn(300)

    serch.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)


    respone = await respone.json()


    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))


    $(".icon-loding").fadeOut(300)

}


function displayIngredients(arr) {


    let continer = "";

    for (let i = 0; i < arr.length; i++) {


        continer += `

        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>

        `
    }

    row.innerHTML = continer
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getCategoryMeals(category) {

    row.innerHTML = ""

    $(".icon-loding").fadeIn(300)


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)


    response = await response.json()


    displayMeals(response.meals.slice(0, 20))


    $(".icon-loding").fadeOut(300)

}

//////////////////////////////////////////////////////////////////////////////////////////////////////

async function getAreaMeals(area) {


    row.innerHTML = ""

    $(".icon-loding").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)

    response = await response.json()


    displayMeals(response.meals.slice(0, 20))


    $(".icon-loding").fadeOut(300)

}

///////////////////////////////////////////////////////////////////////////////////////////

async function getIngredientsMeals(ingredients) {


    row.innerHTML = ""


    $(".icon-loding").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)


    response = await response.json()


    displayMeals(response.meals.slice(0, 20))


    $(".icon-loding").fadeOut(300)

}
///////////////////////////////////////////////////////////////////////////////////////////////

async function getMealDetails(mealID) {



    closeSidebar()


    row.innerHTML = ""

    $(".icon-loding").fadeIn(300)



    serch.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);


    respone = await respone.json();

    displayMealDetails(respone.meals[0])


    $(".icon-loding").fadeOut(300)

}
//////////////////////////////////////  inspect  /////////////////////////////////////////////////////////


function displayMealDetails(meal) {
    
    serch.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {

        if (meal[`strIngredient${i}`]) {

            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
       
        }
    }

    let tags = meal.strTags?.split(",")
   
    if (!tags) tags = []

    let tagsStr = ''

    for (let i = 0; i < tags.length; i++) {

        tagsStr += `

        <li class="alert  m-2 p-1">${tags[i]}</li>
        
        `
    }


    //////////////////////////////////////// ( !!! inspect  !!!  ) /////////////////////////////////////////////////////////



    let continer = `
    <div class="col-md-4">

                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>

            </div>

            <div class="col-md-8">

                <h2>Instructions</h2>

                <p>${meal.strInstructions}</p>

                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>



                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">

                    ${tagsStr}
                </ul>


                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>

                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>

            </div>
            `

    row.innerHTML = continer
}

///////////////////////////////////////////////////////////////////////////////////////////////


function showSearchInputs() {

    serch.innerHTML = `

    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-white text-black border-0" type="text" placeholder="Search-By-Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-whitet text-black border-0" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    
    `

    row.innerHTML = ""
}
//////////////////////////////////////////  inspect !!!!!!  /////////////////////////////////////////////////////////////////

async function searchByName(term) {

    closeSidebar()

    row.innerHTML = ""

    $(".icon-loding").fadeIn(300)


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)

    response = await response.json()


    response.meals ? displayMeals(response.meals) : displayMeals([])

    $(".icon-loding").fadeOut(300)


}

async function searchByFLetter(term) {

    closeSidebar()

    row.innerHTML = ""

    $(".icon-loding").fadeIn(300)


    term == "" ? term = "a" : "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)

    response = await response.json()


    response.meals ? displayMeals(response.meals) : displayMeals([])

    $(".icon-loding").fadeOut(300)

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function contactUs() {
    row.innerHTML =
     `<div class=" d-flex  min-vh-100  justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input type="text" class="form-control " placeholder="Enter-Your-Name"></div>


            <div class="col-md-6">
                <input  type="email" class="form-control " placeholder="Enter-Your-Email"></div>


            <div class="col-md-6">
                <input  type="text" class="form-control " placeholder="Enter-Your-Phone"></div>


            <div class="col-md-6">
                <input type="number" class="form-control " placeholder="Enter-Your-Age"></div>


            <div class="col-md-6">
                <input  " type="password" class="form-control " placeholder="Enter-Your-Password"></div>


            <div class="col-md-6">
                <input   " type="password" class="form-control " placeholder="Re-password"></div>


        </div>
        <button id="submitBtn" disabled class="btn  px-2 mt-3">Submit</button> </div>


         </div> `
   

   
}

/////////////////////////////////////////////// ennnnnndddddddddddddddddddddddddddd ///////////////////////////////////////////////