# JavaScript Example

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

[Run this template on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/stackblitz/templates/hello-world-js)

## Getting started

**Requirements:**

- Node.js version 16.5.0 or higher
- Yarn

```bash
npm init @shopify/hydrogen@latest --template hello-world-ts
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

## Building for production

```bash
yarn build
```

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `yarn preview`:

```bash
yarn build
yarn preview
```

## Template

├── public
│   └── assets
|   │   └── favicon.svg   // Hydrogen favicon
├── src
    ├── routes
    │   ├── index.server.jsx  // The React Server Component used to render your app's homepage
    ├── App.server.jsx  // Your app's top-level React component
    ├── index.css   // Styles
├── hydrogen.config.js  // Hydrogen configuration file
├── index.html   // Your app's root HTML template
├── jsconfig.json // JavaScript or TypeScript configuration file
├── package.json   // Used to install dependencies and run scripts
├── README.md   // A README file that introduces the Hello World template
├── vite.config.js  // Vite configuration file
