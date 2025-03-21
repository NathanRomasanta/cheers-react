import React, { useState } from 'react';
import CustomInputBox from './CustomInputBox';
import BoolInput from './BoolInput';
import TopForm from './TopForm';
import AddPosItem from './Add-PosItem';

function CocktailForm({ typeSelected, setTypeSelected }) {
  // Firestore data
  const [cocktailName, setCocktailName] = useState('');
  const [isLiquor, setIsLiquor] = useState(false);

  const [cocktailPrice, setCocktailPrice] = useState('');
  const [cocktailOz, setCocktailOz] = useState('');
  const [cocktailCategory, setCocktailCategory] = useState('');

  // number of ingredients to render input boxes
  const [cocktailIngredients, setCocktailIngredients] = useState([]); // array of objects
  const [ingredientCount, setIngredientCount] = useState(0);

  const [showIngredients, setShowIngredients] = useState(false);

  const CreateID = (str) => {
    let idNumber = Math.floor(Math.random() * 100);

    return `${str
      .replace(/\s+/g, '')
      .replace(/[aeiou]/gi, '')
      .trim()}-00${idNumber}`;
  };
  const CreatePosItem = (name, price, category, isLiquor, ounces) => {
    let ingredients = [
      cocktailIngredients.map((ingredient) => {
        return {
          id: CreateID(name),
          isLiquor: isLiquor,
          name: name,
          ounces: ounces,
        };
      }),
    ];
    let PosItem = {
      ingredients: ingredients,
      price: price,
      name: name,
      category: category,
    };

    return PosItem;
  };
  const CollectIngredients = ({ cocktailIngredients, ingredientCount }) => {
    return (
      <div>
        <h1>New page</h1>
      </div>
    );
  };

  return (
    <TopForm>
      <h1>{typeSelected.id}</h1>
      {showIngredients ? (
        <CollectIngredients
          cocktailIngredients={cocktailIngredients}
          IngredientCount={ingredientCount}
        />
      ) : (
        <div className='form'>
          <CustomInputBox Headers={[' Name :', 'Price :', 'Ingredients: ']}>
            <input
              type='text'
              className='input input-bordered w-1/2'
              placeholder='Cocktail Name'
              value={cocktailName}
              onChange={(e) => {
                console.log('Name :', e.target.value);
                console.log(CreateID(e.target.value));
                setCocktailCategory(String(typeSelected.id));
                setCocktailName(e.target.value);
              }}
            />
            <input
              type='number'
              className='input input-bordered w-1/2'
              placeholder='Price'
              value={cocktailPrice}
              onChange={(e) => {
                const value = Math.max(0, e.target.value);
                console.log('Price :', value);
                setCocktailPrice(value);
              }}
            />
            <input
              type='number'
              className='input input-bordered w-1/2'
              placeholder=' 0'
              value={ingredientCount}
              onChange={(e) => {
                const value = Math.max(0, e.target.value);
                console.log('Oz :', value);
                setIngredientCount(value);
              }}
            />
          </CustomInputBox>
        </div>
      )}
      <div className='flex flex-row gap-4 m-5 justify-around'>
        <button
          className='btn btn-primary'
          onClick={() => {
            setShowIngredients(true);
          }}>
          Next Ingredient
        </button>
        <button
          className='btn btn-primary'
          onClick={() => setTypeSelected('')}>
          Back
        </button>
      </div>
    </TopForm>
  );
}

export default CocktailForm;
