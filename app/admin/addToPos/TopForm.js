import Image from 'next/image';

function TopForm({ children }) {
  return (
    <div className='card card-side bg-base-100 shadow-sm  w-11/12 relative bottom-32'>
      <figure>
        <Image
          src={'/images/CheersNew.jpg'}
          alt={'Cheers to the future.'}
          width={300}
          height={100}
        />
      </figure>
      <div className='card-body justify-center  gap-5'>
        <h2 className='card-title '>Add Item to Point Of Sale System</h2>
        {children}
      </div>
    </div>
  );
}

export default TopForm;
