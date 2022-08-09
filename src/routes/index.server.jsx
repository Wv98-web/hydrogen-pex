import {Suspense} from 'react';

import FeaturedCollections from '../components/sections/FeaturedCollections.server';
import {Layout} from '../components/global/Layout.server';

export default function Home() {
  return (
    <Layout>
      <Suspense>
        <FeaturedCollections />
      </Suspense>
    </Layout>
  );
}
