import React from 'react'

 function Container({children}) {
    return (
        <div className='w-full   px-12'>
            {children}
        </div>
    );
}

export default Container;