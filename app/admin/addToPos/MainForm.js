import WineForm from './WineForm';
import CocktailForm from './CockTailForm';

function MainForm({ typeSelected, setTypeSelected }) {
  if (typeSelected === '') {
    return (
      <div className='flex flex-col w-full items-center justify-center relative top-1/4'>
        <div className='flex flex-col  items-center justify-around w-full'>
          <h1 className='text-3xl font-bold text-black'>
            Entering area to modify the Point of Sales application
          </h1>
          <div className='flex flex-col items-center justify-center '>
            <h2>Pick a Category at the top of the screen to proceed to form</h2>
            <span className='loading loading-infinity loading-xl bg-gradient-to-r from-zinc-700  to-orange-500'></span>
          </div>
        </div>
        {typeSelected == 'cocktails' && (
          <div className='mb-4'>
            <label
              htmlFor='ouncesPerBottle'
              className='block text-sm font-medium text-gray-700 mb-1'>
              Ounces Per Bottle
            </label>
            <input
              name='ouncesPerBottle'
              type='number'
              id='ouncesPerBottle'
              value={ouncesPerBottle}
              onChange={(e) => setOuncesPerBottle(e.target.value)}
              min='0'
              step='0.1'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
              required={isLiquor}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <WineForm
      typeSelected={typeSelected}
      setTypeSelected={setTypeSelected}
    />
  );
}

export default MainForm;
