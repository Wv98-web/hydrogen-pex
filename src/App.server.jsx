import React, {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  Router,
  FileRoutes,
  ShopifyProvider,
  CartProvider,
} from '@shopify/hydrogen';

import {DefaultSeo} from './components/index.server';

function App({routes}) {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <CartProvider>
          <Suspense>
            <DefaultSeo />
          </Suspense>
          <Router>
            <FileRoutes routes={routes} />
          </Router>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
