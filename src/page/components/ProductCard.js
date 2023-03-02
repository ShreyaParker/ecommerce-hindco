import React from 'react';

const ProductCard = ({product}) => {
    return (

           <div className="gap-2 flex flex-col text-center justify-center">
               <h2 className="text-3xl font-bold ">{product.title}</h2>
               <img src={product.images[0]} alt="products"/>
               <p>{product.description}</p>
               <h2 className="text-2xl font-bold ">{`$${product.price}`}</h2>
               <div>
                   <button className="bg-blue-700 text-white p-2 rounded-lg">Add to cart</button>
               </div>
           </div>


    );
};

export default ProductCard;
