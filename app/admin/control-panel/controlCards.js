function ControlCards({ children }) {
  return (
    <div>
      <div className='p-4 border rounded-lg shadow-lg bg-white relative h-55 w-64'>
        <div className='absolute top-3 left-3 text-lg font-semibold text-gray-500'>
          {children[0]}
        </div>
        <div className='absolute top-3 right-3 text-xl text-gray-500'>
          {children[1]}
        </div>
        <div className='mt-6 text-left'>
          <p className='text-6xl font-bold text-[#FF6E1F]'>{children[2]}</p>
          <div className='h-4'></div>
          <p className='text-sm text-gray-500'>{children[3]}</p>
        </div>
      </div>
    </div>
  );
}

export default ControlCards;
