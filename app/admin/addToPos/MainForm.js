import WineForm from './WineForm';
import CocktailForm from './CockTailForm';

import AddToPosNav from './AddPosNav';

function MainForm({ typeSelected, setTypeSelected }) {
  if (typeSelected === '') {
    return (
      <div className='flex flex-col w-full items-center  h-screen'>
        <AddToPosNav
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
        />
        <div className='flex flex-col h-screen items-center justify-center'>
          <h1 className='text-3xl font-bold'>
            Entering area to modify the Point of Sales application
          </h1>
          <h2>Pick a Category at the top of the screen to proceed to form</h2>
          <span className='loading loading-bars loading-xl bg-gradient-to-r from-zinc-700  to-orange-500 '></span>
        </div>
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
  }
  return (
    <WineForm
      typeSelected={typeSelected}
      setTypeSelected={setTypeSelected}
    />
  );
}

export default MainForm;
