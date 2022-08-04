import { defineConfig } from '@shopify/hydrogen/config';
import { CookieSessionStorage } from '@shopify/hydrogen/config';

/* The `defineConfig` function is an optional utility that provides types for the configuration object. */
export default defineConfig({
  /* The routes defined by Vite's import.meta.globEager method. */
  routes: {
    /* Path from the project root to the files for server components and API handlers */
    files: '/src/routes',
    /* A path that's prepended to all file routes. You can modify `basePath`
     * if you want to prefix all file routes. For example, you can prefix all file routes with a locale.
     */
    basePath: '/',
  },
  /* The information that your app needs to connect to the Storefront API. */
  shopify: {
    /* The app's default language */
    defaultLanguage: 'EN',
    /* The app's default country */
    defaultCountry: 'US',
    /* The domain of your Shopify store */
    // storeDomain: 'hydrogen-preview.myshopify.com',
    storeDomain: 'wuwei01.myshopify.com',
    /* Your app's Storefront API access token */
    // storefrontToken: '3b580e70970c4528da70c98e097c2fa0',
    storefrontToken: '1ad48a338f435c5b4b9f3f7625dd8ba2',
    /* The Storefront API version that your app uses */
    storefrontApiVersion: '2022-07',
  },
  /* The default session storage mechanism for Hydrogen. */
  session: CookieSessionStorage('__session', {
    /* Tells the browser that the cookie should only be sent to the server if it's within the defined path.  */
    path: '/',
    /* Whether to secure the cookie so that client-side JavaScript can't read the cookie. */
    httpOnly: true,
    /* Whether to secure the cookie so that the browser only sends the cookie over HTTPS.  */
    secure: process.env.NODE_ENV === 'production',
    /* Declares that the cookie should be restricted to a first-party or same-site context.  */
    sameSite: 'strict',
    /* The number of seconds until the cookie expires. */
    maxAge: 60 * 60 * 24 * 30,
  }),
  /* A path to a custom page to render when the server encounters an unhandled exception */
  serverErrorPage: '/src/Error.jsx',
});
