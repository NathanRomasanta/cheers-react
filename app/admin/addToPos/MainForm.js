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
          <h1 className='text-3xl font-bold'>Select Item Type to Continue</h1>
          <span className='loading loading-bars loading-xl bg-gradient-to-r from-zinc-700  to-orange-500 '></span>
        </div>
      </div>
    );
  }

  if (typeSelected.id === 'wines') {
    return (
      <WineForm
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
      />
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
}

export default MainForm;
