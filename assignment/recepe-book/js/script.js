document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.querySelector('form');
    const recipesList = document.querySelector('.recipes-list');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    function renderRecipes() {
        recipesList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');
            recipeItem.innerHTML = `
                <div>
                    <h3>${recipe.title}</h3>
                    <p>Ingredients: ${recipe.ingredients}</p>
                    <p>Instructions: ${recipe.instructions}</p>
                </div>
                <div>
                    <button onclick="editRecipe(${index})">Edit</button>
                    <button onclick="deleteRecipe(${index})">Delete</button>
                </div>
            `;
            recipesList.appendChild(recipeItem);
        });
    }

    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const ingredients = e.target.ingredients.value;
        const instructions = e.target.instructions.value;

        if (title && ingredients && instructions) {
            recipes.push({ title, ingredients, instructions });
            localStorage.setItem('recipes', JSON.stringify(recipes));
            renderRecipes();
            e.target.reset();
        }
    });

    window.editRecipe = function(index) {
        const recipe = recipes[index];
        const title = prompt('Edit title:', recipe.title);
        const ingredients = prompt('Edit ingredients:', recipe.ingredients);
        const instructions = prompt('Edit instructions:', recipe.instructions);

        if (title !== null && ingredients !== null && instructions !== null) {
            recipes[index] = { title, ingredients, instructions };
            localStorage.setItem('recipes', JSON.stringify(recipes));
            renderRecipes();
        }
    };

    window.deleteRecipe = function(index) {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
    };

    renderRecipes();
});