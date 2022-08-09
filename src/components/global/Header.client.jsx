import React, {Fragment} from 'react';
import {useCart, Link} from '@shopify/hydrogen';
import {Popover, Transition} from '@headlessui/react';
import {classNames} from '../../lib/util';

import {Drawer, useDrawer} from './Drawer.client';
import {CartDetails} from '../cart/CartDetails.client';

export function Header({shop, menu, isHome}) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();

  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div>
          <Drawer.Title>
            <h2 className="sr-only">Cart Drawer</h2>
          </Drawer.Title>
          <CartDetails onClose={closeDrawer} />
        </div>
      </Drawer>
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

          <nav>
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="h-full flex space-x-8">
                {menu?.items.map((item) =>
                  item.items.length > 0 ? (
                    <Popover key={item.id} className="flex">
                      {({open}) => (
                        <>
                          <div className="relative flex">
                            {/* level 1 */}
                            <Popover.Button
                              className={
                                !isHome
                                  ? classNames(
                                      open
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-900',
                                    )
                                  : classNames(
                                      open
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-white hover:text-gray-300',
                                    )
                              }
                            >
                              {item.title}
                            </Popover.Button>
                          </div>

                          {/*  */}
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full left-0 w-full text-gray-500 border-t border-gray-200">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />
                              <div className="relative bg-white p-6 md:px-8 lg:px-12">
                                <div className="mx-auto">
                                  <div className="grid grid-cols-3 gap-y-10 gap-x-8 ">
                                    {/* level 2 */}
                                    {item?.items.map((item) =>
                                      item.items.length > 0 ? (
                                        <div key={item.id}>
                                          <p
                                            to={item.to}
                                            className="text-black"
                                          >
                                            {item.title}
                                          </p>
                                          <ul
                                            role="list"
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {/* level 3 */}
                                            {item?.items.map((item) => (
                                              <li key={item.id}>
                                                <Link
                                                  to={item.to}
                                                  className="text-gray-500 hover:text-gray-900"
                                                >
                                                  {item.title}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ) : (
                                        <Link
                                          key={item.id}
                                          to={item.to}
                                          className="text-gray-500 hover:text-gray-900"
                                        >
                                          {/* level 2 */}
                                          {item.title}
                                        </Link>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ) : (
                    <Popover key={item.id}>
                      {/* level 1 */}
                      {({open}) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={
                                !isHome
                                  ? classNames(
                                      open
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-900',
                                    )
                                  : classNames(
                                      open
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-white hover:text-gray-300',
                                    )
                              }
                            >
                              <Link to={item.to}>{item.title}</Link>
                            </Popover.Button>
                          </div>
                        </>
                      )}
                    </Popover>
                  ),
                )}
              </div>
            </Popover.Group>
          </nav>
        </div>

        <button
          onClick={openDrawer}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </header>
    </>
  );
}

function IconBag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </svg>
  );
}

function CartBadge({dark}) {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark ? 'text-black bg-white' : 'text-white bg-black'
      } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
