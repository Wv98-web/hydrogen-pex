import {
  useShopQuery,
  CacheLong,
  gql,
  useUrl,
  Link,
  Seo,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {parseMenu} from '../lib/util';

import {Header} from './index';

const HEADER_MENU_HANDLE = 'main-menu';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export function Layout({children}) {
  const {pathname} = useUrl();
  const isHome = pathname === '/';

  const {shop, menu} = useLayoutQuery();

  return (
    <>
      <Suspense>
        <Seo
          type="defaultSeo"
          data={{
            title: shop.name,
            description: shop.description,
          }}
        />
      </Suspense>
      <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <header
          role="banner"
          className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm ${
            isHome ? 'bg-black/80 text-white' : 'bg-white/80'
          }`}
        >
          <div className="flex gap-12">
            <Link className="font-bold" to="/">
              {shop.name}
            </Link>

            <Header menu={menu} isHome={isHome} />
          </div>
        </header>

        <main role="main" id="mainContent" className="flex-grow">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </>
  );
}

function useLayoutQuery() {
  const {data} = useShopQuery({
    query: SHOP_QUERY,
    variables: {
      headerMenuHandle: HEADER_MENU_HANDLE,
    },
    cache: CacheLong(),
  });

  const customPrefixes = {BLOG: '', CATALOG: 'products'};

  const shop = data?.shop;
  const menu = data?.menu ? parseMenu(data.menu, customPrefixes) : undefined;

  return {shop, menu};
}

const SHOP_QUERY = gql`
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  query LayoutMenus($headerMenuHandle: String!) {
    shop {
      name
      description
    }
    menu(handle: $headerMenuHandle) {
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
          items {
            ...MenuItem
          }
        }
      }
    }
  }
`;
