```
npx create-expo-app@latest
```

1. Install Nativewind
You will need to install nativewind and its peer dependencies tailwindcss, react-native-reanimated and react-native-safe-area-context.
```
npm install nativewind react-native-reanimated react-native-safe-area-context
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo
```

2. Setup Tailwind CSS
```Run npx tailwindcss init``` to create a tailwind.config.js file

Add the paths to all of your component files in your tailwind.config.js file.
```
tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
} 
```
3. Create a CSS file and add the Tailwind directives.
```
global.css

@tailwind base;
@tailwind components;
@tailwind utilities;

4. Add the Babel preset
babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```
5.  Create or modify your metro.config.js
Create a metro.config.js file in the root of your project if you don't already have one, then add the following configuration:

metro.config.js

```
npx expo customize metro.config.js
```
```
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: './app/global.css' })
```
6. in _layout.tsx
```
import "./global.css"
 
export default App() {
  /* Your App */
}
```

7. TypeScript setup (optional)
If you're using TypeScript in your project, you'll need to set up the type definitions. Nativewind extends the React Native types via declaration merging. The simplest method to include the types is to create a new nativewind-env.d.ts file and add a triple-slash directive referencing the types.

```
/// <reference types="nativewind/types" />
```
