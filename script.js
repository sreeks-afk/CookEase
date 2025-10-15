document.addEventListener('DOMContentLoaded', function () {
  const recipes = {
    Pancakes: {
      image: 'images/pancakes/cover.jpg',
      steps: [
        'Mix flour, milk, eggs, and sugar in a bowl.',
        'Heat a pan and pour some batter.',
        'Flip pancake when bubbles appear.',
        'Serve hot with syrup.'
      ],
      ingredients: ['1 cup flour', '1 cup milk', '1 egg', '2 tbsp sugar']
    },
    Omelette: {
      image: 'images/omelette/cover.jpg',
      steps: [
        'Beat eggs with salt and pepper.',
        'Heat butter in a pan.',
        'Pour eggs and cook gently.',
        'Fold omelette and serve.'
      ],
      ingredients: ['2 eggs', 'Salt', 'Pepper', '1 tbsp butter']
    },
    Salad: {
      image: 'images/salad/cover.jpg',
      steps: [
        'Chop fresh vegetables.',
        'Mix olive oil, lemon juice, salt for dressing.',
        'Toss vegetables with dressing.',
        'Serve fresh and cool.'
      ],
      ingredients: ['Lettuce', 'Tomato', 'Cucumber', 'Olive oil', 'Lemon juice']
    },
    Pasta: {
      image: 'images/pasta/cover.jpg', // Path to your pasta cover image
      steps: [
        'Boil water and cook pasta according to package directions.',
        'In a separate pan, sauté garlic and tomatoes.',
        'Add cooked pasta to the sauce and toss.',
        'Serve hot with Parmesan cheese.'
      ],
      ingredients: ['200g pasta', '2 cloves garlic', '2 tomatoes', 'Olive oil', 'Parmesan cheese']
    },
    Soup: {
      image: 'images/soup/cover.jpg', // Path to your soup cover image
      steps: [
        'Chop vegetables (carrots, celery, onions).',
        'Sauté vegetables in a pot with oil.',
        'Add broth and simmer until vegetables are tender.',
        'Season and serve warm.'
      ],
      ingredients: ['1 carrot', '1 celery stalk', '1 onion', '4 cups vegetable broth', 'Salt', 'Pepper']
    }
  };

  let currentRecipe = null;
  let currentStep = 0;
  let recipeName = '';

  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const recipeView = document.getElementById('recipe-view');
  const recipeButtons = document.getElementById('recipe-buttons');
  const prevBtn = document.getElementById('prev-step');
  const nextBtn = document.getElementById('next-step');
  const backToListBtn = document.getElementById('back-to-list');
  const ingredientsView = document.getElementById('ingredients-view');
  const backToSelectionBtn = document.getElementById('back-to-selection');

  

  backToSelectionBtn.addEventListener('click', function () 
  {
    ingredientsView.style.display = 'none';
    page2.style.display = 'block';
  });

  document.getElementById('back-to-ingredients').addEventListener('click', function () 
  {
    recipeView.style.display = 'none';
    ingredientsView.style.display = 'block';
    recipeButtons.style.display = 'none';
  });


  // Go to recipe list page from welcome
  document.getElementById('to-recipe-list').addEventListener('click', function () {
    page1.style.display = 'none';
    page2.style.display = 'block';
    recipeView.style.display = 'none';
    recipeButtons.style.display = 'none';
  });

  // Back to welcome from recipe list
  document.getElementById('back-to-welcome').addEventListener('click', function () {
    page2.style.display = 'none';
    page1.style.display = 'block';
    recipeView.style.display = 'none';
    recipeButtons.style.display = 'none';
  });

  // Back to recipe list from recipe view
  backToListBtn.addEventListener('click', function () {
    recipeView.style.display = 'none';
    recipeButtons.style.display = 'none';
    page2.style.display = 'block';
    resetRecipeView();
  });

  // Start Recipe - shows ingredients
  document.getElementById('recipe-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const selected = document.querySelector('input[name="recipe"]:checked');
    if (!selected) {
      alert('Please select a recipe!');
      return;
    }

    recipeName = selected.value;
    currentRecipe = recipes[recipeName];
    currentStep = 0;

    showIngredients(recipeName, currentRecipe.ingredients);
    page2.style.display = 'none';
    ingredientsView.style.display = 'block';
  });

  // Show ingredients with images
  function showIngredients(recipeName, ingredients) {
    document.getElementById('ingredients-title').textContent = `🧂 Ingredients for ${recipeName}`;
    const ul = document.getElementById('ingredients-list');
    ul.innerHTML = '';
    const folder = recipeName.toLowerCase();

    ingredients.forEach((item, index) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = `images/ingredients/${folder}/item${index + 1}.jpg`;
      img.alt = item;

      const label = document.createElement('p');
      label.textContent = item;

      li.appendChild(img);
      li.appendChild(label);
      ul.appendChild(li);
    });
  }

  // Start cooking (move to steps)  
  document.getElementById('start-cooking').addEventListener('click', function () {
    ingredientsView.style.display = 'none';
    recipeView.style.display = 'block';
    recipeButtons.style.display = 'block';

    // Show cover
    const img = document.getElementById('recipe-image');
    img.src = currentRecipe.image;
    img.alt = `${recipeName} cover image`;
    document.getElementById('recipe-title').textContent = `Recipe: ${recipeName}`;
    document.getElementById('recipe-step').textContent = '';

    currentStep = 0;
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
  });

  // Show step
  function showStep(stepNum) {
    document.getElementById('recipe-step').textContent = currentRecipe.steps[stepNum - 1];
    document.getElementById('recipe-title').textContent = `Step ${stepNum} of ${currentRecipe.steps.length}`;
    const stepImg = document.getElementById('recipe-image');
    const folder = recipeName.toLowerCase();
    stepImg.src = `images/${folder}/step${stepNum}.jpg`;
    stepImg.alt = `Step ${stepNum} image`;
  }

  // Next Step
  nextBtn.addEventListener('click', function () {
    if (!currentRecipe) return;

    if (currentStep === 0) {
      currentStep = 1;
      showStep(currentStep);
      prevBtn.style.display = 'inline-block';
    } else if (currentStep < currentRecipe.steps.length) {
      currentStep++;
      showStep(currentStep);
    }

    if (currentStep === currentRecipe.steps.length) {
      nextBtn.style.display = 'none';
    }
  });

  // Previous Step
  prevBtn.addEventListener('click', function () {
    if (!currentRecipe) return;

    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
      nextBtn.style.display = 'inline-block';
    } else if (currentStep === 1) {
      currentStep = 0;
      document.getElementById('recipe-step').textContent = '';
      document.getElementById('recipe-title').textContent = `Recipe: ${recipeName}`;
      const img = document.getElementById('recipe-image');
      img.src = currentRecipe.image;
      img.alt = `${recipeName} cover image`;
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'inline-block';
    }
  }); 

  // Reset view
  function resetRecipeView() {
    currentRecipe = null;
    currentStep = 0;
    recipeName = '';
    document.getElementById('recipe-step').textContent = '';
    document.getElementById('recipe-image').src = '';
    document.getElementById('recipe-title').textContent = '';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
  }
});

// SEARCH function to filter recipe labels
function searchRecipe() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const form = document.getElementById('recipe-form');
  const labels = form.querySelectorAll('label');

  labels.forEach(label => {
    const text = label.textContent.toLowerCase();
    if (text.includes(input)) {
      label.style.display = '';
    } else {
      label.style.display = 'none';
    }
  });
}

