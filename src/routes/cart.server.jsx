import React from 'react';
import {CartShopPayButton, CartProvider} from '@shopify/hydrogen';

export default function Cart() {
  return (
    <>
      <CartProvider>
        <CartShopPayButton />
      </CartProvider>
    </>
  );
}
