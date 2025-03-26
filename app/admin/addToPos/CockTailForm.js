import React, { useState } from 'react';
import CustomInputBox from './CustomInputBox';
import BoolInput from './BoolInput';
import TopForm from './TopForm';
import AddPosItem from './Add-PosItem';
import SubForm from './SubForm';
import Table from '../CashOutScreen/Table';

function CocktailForm({ typeSelected, setTypeSelected }) {
  // Firestore data
  const [cocktailName, setCocktailName] = useState('');
  const [isLiquor, setIsLiquor] = useState(false);

  const [cocktailPrice, setCocktailPrice] = useState('');
  const [cocktailOz, setCocktailOz] = useState('');

  // number of ingredients to render input boxes
  const [cocktailIngredients, setCocktailIngredients] = useState([]); // array of ingredient objects
  const [ingredientCount, setIngredientCount] = useState(0);

  const [showIngredients, setShowIngredients] = useState(false);

  // ingredient data
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientOz, setIngredientOz] = useState('');
  const [ingredientIsLiquor, setIngredientIsLiquor] = useState(false);

  // table states

  const [ifAdded, setIfAdded] = useState(false);
  const CreateID = (str) => {
    let idNumber = Math.floor(Math.random() * 100);

    return `${str
      .replace(/\s+/g, '')
      .replace(/[aeiou]/gi, '')
      .trim()}-00${idNumber}`;
  };

  const CreatePosItem = (name, price, category) => {
    let ingredients = cocktailIngredients;

    let PosItem = {
      ingredients: ingredients,
      price: price,
      name: name,
      category: typeSelected.id,
    };

    return PosItem;
  };

  const handleNextIngredient = () => {
    let newIngredient = {
      id: CreateID(ingredientName),
      name: ingredientName,
      isLiquor: ingredientIsLiquor,
      ounces: ingredientOz,
    };

    setCocktailIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients, newIngredient];
      console.log('cocktailIngredients :', updatedIngredients);
      return updatedIngredients;
    });
    setIngredientName('');
    setIngredientOz('');
    setIngredientIsLiquor(null);
  };

  const renderIngredientSubForm = ({
    ifAdded,
    setIfAdded,
    setShowIngredients,
    setIngredientCount,
    setCocktailIngredients,
    setCocktailName,
    setCocktailPrice,
    setCocktailCategory,
    setCocktailOz,
    setIngredientName,
    setIngredientOz,
    setIngredientIsLiquor,
    setIsLiquor,
  }) => {
    while (cocktailIngredients.length !== ingredientCount) {
      return (
        <div>
          <h1>Ingredient {cocktailIngredients.length + 1}</h1>
          <SubForm
            ingredientName={ingredientName}
            setIngredientName={setIngredientName}
            ingredientIsLiquor={ingredientIsLiquor}
            setIngredientIsLiquor={setIngredientIsLiquor}
            ingredientOunces={ingredientOz}
            setIngredientOunces={setIngredientOz}
            CreateID={CreateID}
          />
        </div>
      );
    }
    return (
      <div>
        <h1>{cocktailName}</h1>
        <h1>{cocktailPrice}</h1>
        <h2>Ingredients List:</h2>
        <ul>
          {cocktailIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} - {ingredient.ounces} oz -{' '}
              {ingredient.isLiquor ? 'Liquor' : 'Non-Liquor'}
            </li>
          ))}
        </ul>
        <h1>You finished</h1>
        {!ifAdded ? (
          <button
            className='btn'
            onClick={() => {
              let item = CreatePosItem(
                cocktailName,
                cocktailPrice,
                typeSelected
              );
              console.log('Created For Firebase: ', item);
              console.log('Ingredients Array: ', cocktailIngredients);
              AddPosItem(item);
              setIfAdded(true);
            }}>
            Add to POS
          </button>
        ) : (
          <button
            className='btn'
            onClick={() => {
              // Reset all states and inputs
              setShowIngredients(false);
              setIngredientCount(0);
              setCocktailIngredients([]);
              setCocktailName('');
              setCocktailPrice('');
              setIfAdded(false);

              setCocktailOz('');
              setIngredientName('');
              setIngredientOz('');
              setIngredientIsLiquor(false);
              setIsLiquor(false);
            }}>
            Make Another Creation
          </button>
        )}
      </div>
    );
  };

  return (
    <TopForm>
      <h1>{typeSelected.id}</h1>
      {showIngredients ? (
        renderIngredientSubForm({
          ifAdded,
          setIfAdded,
          setShowIngredients,
          setIngredientCount,
          setCocktailIngredients,
          setCocktailName,
          setCocktailPrice,

          setCocktailOz,
          setIngredientName,
          setIngredientOz,
          setIngredientIsLiquor,
          setIsLiquor,
        })
      ) : (
        <div className='form'>
          <CustomInputBox
            Headers={[
              ' Cocktail Name :',
              ' Cocktail Price :',
              ' # of Ingredients: ',
            ]}>
            <input
              type='text'
              className='input input-bordered w-1/2'
              placeholder='Cocktail Name'
              value={cocktailName}
              onChange={(e) => {
                console.log('Name :', e.target.value);
                console.log(CreateID(e.target.value));

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
        {!showIngredients ? (
          <div>
            <button
              className='btn btn-primary'
              onClick={() => {
                setShowIngredients(true);
              }}>
              Create Cocktail
            </button>
            <button
              className='btn btn-primary'
              onClick={() => setTypeSelected('')}>
              Back
            </button>{' '}
          </div>
        ) : (
          <div>
            <button
              className='btn btn-primary'
              onClick={() => handleNextIngredient()}>
              Next Ingredient
            </button>
            <button
              className='btn btn-primary'
              onClick={() => setShowIngredients(false)}>
              Back
            </button>
          </div>
        )}
      </div>
    </TopForm>
  );
}

export default CocktailForm;
