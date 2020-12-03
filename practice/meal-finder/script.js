const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal')

//search meal and fetch from api
function searchMeal(e){
    e.preventDefault();

    //clear single meal
    single_mealEl.innerHTML = '';

    //get search term
    const term = search.value;
    
    //check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h3>search results for '${term}': </h3>`;

                if(data.meals === null){
                    resultHeading.innerHTML = `<p>There are no search results. Try agaon!</p>`
                } else {
                    mealEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>`).join('');
                }
            });
            //clear search area
            search.value='';

    } else {
        alert('please enter a search term');
    }
}

//fetch random meal from api
function randomMeal() {

    //clear meals and heading
    mealEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}

//fetch meal by ID
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal)
        });
}

//add meal to DOM
function addMealToDOM(meal){
    const ingredients = [];
    for(let i =1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }

    single_mealEl.classList.add('open');

    single_mealEl.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <div class="single-meal-info">
        ${meal.strCategory ? `<span>Category: <strong>${meal.strCategory}</strong></span>` : ''}
        ${meal.strArea ? `<span>Area: <strong>${meal.strArea}</strong></span>` : ''}
    </div>
    <div class="single-meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="main">
            <p>${meal.strInstructions}</p>
        </div> 
    </div>
    <h2>Ingreditents</h2>
    <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    `;
}

//event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);

mealEl.addEventListener('click', (e)=>{
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealById(mealID);
    }
})
