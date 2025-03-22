import React, { useState } from 'react';
import CustomInputBox from './CustomInputBox';
import BoolInput from './BoolInput';

function SubForm({
  ingredientName,
  setIngredientName,
  ingredientIsLiquor,
  setIngredientIsLiquor,
  ingredientOunces,
  setIngredientOunces,
  CreateID,
}) {
  return (
    <div>
      <CustomInputBox Headers={[' Name :', 'Liquor ?']}>
        <input
          type='text'
          className='input input-bordered w-1/2'
          placeholder='Cocktail Name'
          value={ingredientName || ''}
          onChange={(e) => {
            console.log('Name :', e.target.value);
            console.log(CreateID(e.target.value));
            setIngredientName(e.target.value);
          }}
        />
        <BoolInput
          setBool={setIngredientIsLiquor}
          Boolean={ingredientIsLiquor}
        />
      </CustomInputBox>
      {ingredientIsLiquor ? (
        <CustomInputBox Headers={[' Ounces:']}>
          <input
            type='number'
            className='input input-bordered w-1/2'
            placeholder=' 0'
            value={ingredientOunces}
            onChange={(e) => {
              const value = Math.max(0, e.target.value);
              console.log('Oz :', value);
              setIngredientOunces(value);
            }}
          />
        </CustomInputBox>
      ) : null}
    </div>
  );
}

export default SubForm;
