import React, { useState } from 'react';
import GrilledChickenSalad from './GrilledChickenSalad.jpg';
import AvocadoToast from './AvocadoToast.jpg';
import SmoothieBowl from './SmoothieBowl.jpg';
import VegetableStirFry from './VegetableStirFry.jpg';
import QuinoaSalad from './QuinoaSalad.jpg';

const recipes = [
  {
    id: 1,
    title: 'Quinoa Salad',
    image: QuinoaSalad,
    shortDescription: 'A healthy quinoa salad with vegetables and dressing.',
    fullRecipe: `Ingredients:
    - 1 cup quinoa
    - 2 cups water
    - 1 cucumber, diced
    - 1 bell pepper, diced
    - 1/4 cup olive oil
    - 2 tbsp lemon juice
    - Salt and pepper to taste

    Steps:
    1. Rinse quinoa and cook in water until tender.
    2. Let quinoa cool.
    3. Mix quinoa with cucumber, bell pepper, olive oil, lemon juice, salt, and pepper.
    4. Serve chilled.`
  },
  {
    id: 2,
    title: 'Avocado Toast',
    image: AvocadoToast,
    shortDescription: 'Simple and delicious avocado toast.',
    fullRecipe: `Ingredients:
    - 1 ripe avocado
    - 2 slices of whole grain bread
    - Salt and pepper to taste

    Steps:
    1. Toast the bread.
    2. Mash the avocado and spread on toast.
    3. Sprinkle salt and pepper.
    4. Serve immediately.`
  },
  {
    id: 3,
    title: 'Smoothie Bowl',
    image: SmoothieBowl,
    shortDescription: 'A nutritious smoothie bowl with fresh fruits.',
    fullRecipe: `Ingredients:
    - 1 banana
    - 1/2 cup frozen berries
    - 1/2 cup Greek yogurt
    - 1/4 cup granola
    - Fresh fruit for topping

    Steps:
    1. Blend banana, frozen berries, and Greek yogurt until smooth.
    2. Pour into a bowl.
    3. Top with granola and fresh fruit.
    4. Enjoy immediately.`
  },
  {
    id: 4,
    title: 'Grilled Chicken Salad',
    image: GrilledChickenSalad,
    shortDescription: 'A hearty grilled chicken salad with greens.',
    fullRecipe: `Ingredients:
    - 2 chicken breasts
    - 4 cups mixed greens
    - 1/4 cup cherry tomatoes, halved
    - 1/4 cup feta cheese
    - 1/4 cup balsamic vinaigrette

    Steps:
    1. Grill chicken breasts until cooked through.
    2. Slice chicken and place on top of greens.
    3. Add cherry tomatoes and feta cheese.
    4. Drizzle with balsamic vinaigrette.
    5. Serve immediately.`
  },
  {
    id: 5,
    title: 'Vegetable Stir-Fry',
    image: VegetableStirFry,
    shortDescription: 'A quick and easy vegetable stir-fry.',
    fullRecipe: `Ingredients:
    - 1 bell pepper, sliced
    - 1 carrot, sliced
    - 1 broccoli head, cut into florets
    - 2 tbsp soy sauce
    - 1 tbsp olive oil
    - 1 garlic clove, minced

    Steps:
    1. Heat olive oil in a pan.
    2. Add garlic and cook until fragrant.
    3. Add bell pepper, carrot, and broccoli.
    4. Stir-fry until vegetables are tender.
    5. Add soy sauce and stir to coat.
    6. Serve immediately.`
  }
];

const RecipeCard = ({ recipe, onClick }) => (
  <div
    style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      overflow: 'hidden',
      textAlign: 'left',
      width: '400px', // increased by 100px
      margin: '10px',
      padding: '10px'
    }}
    onClick={() => onClick(recipe.id)}
  >
    <div
      style={{
        maxWidth: '100%',
        height: '300px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          maxWidth: '100%',
          height: '300px',
          display: recipe.image ? 'block' : 'none'
        }}
      />
      {!recipe.image && <span>No Image Available</span>}
    </div>
    <h2 style={{ fontSize: '1.25rem', margin: '10px 0' }}>{recipe.title}</h2>
    <p style={{ fontSize: '0.9rem', margin: '10px 0' }}>{recipe.shortDescription}</p>
  </div>
);

const RecipeDetails = ({ recipe, onClose }) => (
  <div
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onClick={onClose}
  >
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: '90vw',
        maxHeight: '90vh', // Set max height to 90% of viewport height
        overflowY: 'auto', // Allow vertical scrolling if content overflows
        padding: '20px',
        position: 'relative',
        textAlign: 'left'
      }}
      onClick={e => e.stopPropagation()}
    >
      <h2>{recipe.title}</h2>
      <div
        style={{
          maxWidth: '100%',
          maxHeight: '400px', // Limit image container height
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: recipe.image ? 'block' : 'none'
          }}
        />
        {!recipe.image && <span>No Image Available</span>}
      </div>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{recipe.fullRecipe}</pre>
      <button
        onClick={onClose}
        style={{
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer',
          padding: '10px 20px'
        }}
      >
        Close
      </button>
    </div>
  </div>
);

const Recipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (id) => {
    const recipe = recipes.find(r => r.id === id);
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      {filteredRecipes.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}
        >
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={handleCardClick} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            color: '#888',
            fontSize: '1.25rem'
          }}
        >
          No such recipes available now
        </div>
      )}
      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} onClose={handleCloseModal} />}
    </div>
  );
};

export default Recipes;