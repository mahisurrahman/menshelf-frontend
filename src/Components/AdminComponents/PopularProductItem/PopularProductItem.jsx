import React from 'react';

const PopularProductItem = () => {
    return (
        <div className='flex items-center justify-between p-2 my-4'>
            <div className='flex items-center gap-4'>
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-[4vw] object-cover rounded-lg' alt="" />
                <div className=''>
                    <h1 className='text-lg'>Nike Sneakers</h1>
                    <p className='text-xs tracking-widest'>Shoes</p>
                </div>
            </div>
            <div>
                <p className='text-xl font-extrabold'>$ <span>{`35`}</span></p>
            </div>
        </div>
    );
};

export default PopularProductItem;