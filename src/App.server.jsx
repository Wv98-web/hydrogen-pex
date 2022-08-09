import React, {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, FileRoutes, ShopifyProvider} from '@shopify/hydrogen';

import {DefaultSeo} from './components/index.server';

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <Suspense>
          <DefaultSeo />
        </Suspense>
        <Router>
          <FileRoutes />
        </Router>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
