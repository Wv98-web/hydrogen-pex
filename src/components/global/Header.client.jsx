import {Fragment} from 'react';
import {Link} from '@shopify/hydrogen';
import React from 'react';
import {Popover, Transition} from '@headlessui/react';
import {classNames} from '../../lib/util';

export function Header({menu}) {
  return (
    <>
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
                          className={classNames(
                            open
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:text-gray-900',
                          )}
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
                                      <p to={item.to} className="text-black">
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
                <Popover>
                  {({open}) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={classNames(
                            open
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:text-gray-900',
                          )}
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
    </>
  );
}
