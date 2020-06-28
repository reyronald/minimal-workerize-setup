# Minimal Workerize Setup

A minimal web app written in TypeScript that uses Web Workers by leveraging [`workerize`](http://npm.im/workerize), [`workerize-loader`](http://npm.im/workerize-loader) and webpack.

The goal is to demonstrate the necessary tooling set-up to make it all work, and also includes tests written in [jest](https://jestjs.io/) and [mocha](https://mochajs.org/).

|          No web worker          |          Using web worker           |
| :-----------------------------: | :---------------------------------: |
| ![no web worker][no web worker] | ![with web worker][with web worker] |

[no web worker]: https://user-images.githubusercontent.com/7514993/85936171-f82d2e00-b8c5-11ea-9375-48bff5b84ffa.gif
[with web worker]: https://user-images.githubusercontent.com/7514993/85936213-53f7b700-b8c6-11ea-9d00-cf2baf702751.gif

# Local development

```bash
npm i
npm start
```

See `package.json`'s for testing scripts.
