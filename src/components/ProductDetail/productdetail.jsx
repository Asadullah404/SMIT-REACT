const ProductDetail = ({ products }) => {
    return (
        <div>
            {products.map(product => (
                <div key={product.id} className="product-item">
                    <h2>{product.title}</h2>
                    <p>{product.price}</p>
                    {/* Add other product details as needed */}
                </div>
            ))}
        </div>
    );
};
import React from 'react';


