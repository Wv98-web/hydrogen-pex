import {
  useCart,
  CartLineProvider,
  CartShopPayButton,
  Link,
  Money,
} from '@shopify/hydrogen';

import {CartEmpty} from './CartEmpty.client';
import {CartLineItem} from './CartLineItem.client';

export function CartDetails({onClose}) {
  const {lines} = useCart();
  console.log(lines, 'lines');

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }

  return (
    <form className="grid grid-cols-1 grid-rows-[1fr_auto] h-[calc(100vh-6rem)]">
      <section
        aria-labelledby="cart-contents"
        className="px-4 pb-4 overflow-auto transition md:px-12"
      >
        <ul className="grid gap-6 md:gap-10 overflow-y-scroll">
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>
      <section
        aria-labelledby="summary-heading"
        className="p-4 border-t md:px-12"
      >
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>
        <OrderSummary />
        <CartCheckoutActions />
      </section>
    </form>
  );
}

function CartCheckoutActions() {
  const {checkoutUrl} = useCart();
  return (
    <>
      <div className="flex flex-col items-center mt-6 md:mt-8">
        <Link
          to={checkoutUrl}
          width="full"
          className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
        >
          Continue to Checkout
        </Link>
        <CartShopPayButton className="flex items-center justify-center rounded-sm mt-2 bg-[#5a31f4] w-full" />
      </div>
    </>
  );
}

function OrderSummary() {
  const {cost} = useCart();
  return (
    <>
      <dl className="space-y-2">
        <div className="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="flex items-center">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-green-600">Free and carbon neutral</dd>
        </div>
      </dl>
    </>
  );
}
