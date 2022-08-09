import {CacheLong, gql, Seo, useShopQuery} from '@shopify/hydrogen';

export function DefaultSeo() {
  const {
    data: {
      shop: {name, description},
    },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: '*',
  });

  return (
    <Seo
      type="defaultSeo"
      data={{
        title: name,
        description,
        titleTemplate: `%s · ${name}`,
      }}
    />
  );
}

const SHOP_QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;
