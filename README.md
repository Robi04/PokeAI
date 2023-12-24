# PokeAI
PokeAI is a Web Interface using React that works exactly like ChatGPT but that works fully locally so with 100% privacy !!!

<img src="./src/assets/vid1.mp4">

## Why would you use this ?
- Learn to download/run LLMs on your own computer using llama.cpp or ollama
- Create an API from those LLMS
- Query them and manage the stream you GET

## And after that...
You have now the choice to stop there and to just use another LLM than the 99% of people who use ChatGPT from openAI,
But you can also go farther and fine-tune/train the model with your own data to adapt the utility of your chatbot.
That's my goal for this repository, I want to create the perfect Pokémons professor



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
