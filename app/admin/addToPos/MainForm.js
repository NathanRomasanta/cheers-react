import WineForm from './WineForm';
import CocktailForm from './CockTailForm';

function MainForm({ typeSelected, setTypeSelected }) {
  if (typeSelected === '') {
    return (
      <div className='flex flex-col w-full items-center justify-center relative top-1/4'>
        <div className='flex flex-row  items-center justify-center gap-12 w-full'>
          <div className='inline-grid *:[grid-area:1/1]'>
            <div className='status status-warning animate-ping'></div>
            <div className='status status-warning'></div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold text-black'>
              Entering area to modify the Point of Sales application
            </h1>
            <p>
              Select the type of item you want to add to the POS system from
              below.
            </p>
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

  if (typeSelected.id === 'cocktails') {
    return (
      <CocktailForm
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
      />
    );
  } else {
    return (
      <WineForm
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
      />
    );
  }
}

export default MainForm;
