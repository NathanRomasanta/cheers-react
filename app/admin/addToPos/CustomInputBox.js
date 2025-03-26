const CustomInputBox = ({ Headers, children }) => {
  if (children.length > 1) {
    return (
      <div className='flex flex-col justify-center items-center gap-4  '>
        {children.map((child, index) => (
          <div
            key={index}
            className='flex justify-around items-center gap-4 w-2/3 '>
            <label className='label'>
              <span className='label-text '>{Headers[index]}</span>
            </label>
            {child}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className='flex flex-col  items-center '>
        <div className='flex justify-around items-center w-2/3 mt-5 gap-5'>
          <label className='label'>
            <span className='label-text '>
              {Array.isArray(Headers) ? Headers[0] : Headers}
            </span>
          </label>
          {Array.isArray(children) ? children[0] : children}
        </div>
      </div>
    );
  }
};

export default CustomInputBox;
