import React from 'react';
function Spliter({ children, title, title2 }) {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];
  const secondChild = childrenArray[1];

  return (
    <div className='flex  h-auto w-auto   justify-center items-center '>
      <div className='card lg:card-side  rounded-box grid min-w-min   flex-grow place-items-center  '>
        <h1 className='text-xl font-bold mb-5 '>{title}</h1>
        {firstChild}
      </div>
      {secondChild && (
        <>
          <div className='divider divider-horizontal '></div>

          <div className='card lg:card-side bg-opacity-0 rounded-box grid min-w-fit border place-items-center  '>
            <h1 className='text-xl font-bold mb-5 '>{title2}</h1>
            {secondChild}
          </div>
        </>
      )}
    </div>
  );
}

export default Spliter;
