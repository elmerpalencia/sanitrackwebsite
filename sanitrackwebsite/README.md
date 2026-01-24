# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



For Team 15 (IGNORE EVERYTHING ELSE ABOVE):
If you are wanting to do development on the website here are the steps.
1. Have Docker Desktop downloaded on your computer. You DON'T need to make an account.
2. Clone the repo of the sanitrack website.
3. Build and run the docker with: docker compose up --build
4. Open up the website on localhost:8080/
5. That's it, the yaml file I created should do everything for you. Text me if you have an issue.

How to stop the Docker from running:

1. Run: docker compose down
2. That's it. Also reminder, all of these commands should be done in the terminal, and if you're on windows (Tony), I recommond doing all of this in WSL.


If you want to run the hot reload version of the website (the one above is for PROD, just run the the runHotReloadContainer.sh bash file).


