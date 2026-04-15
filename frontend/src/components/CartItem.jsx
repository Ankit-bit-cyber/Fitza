// CartItem Component
import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.quantity}</p>
    </div>
  );
};

export default CartItem;