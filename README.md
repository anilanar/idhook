# React 18 released `useId`, which replaces `idhook`. You don't need this anymore.

---------

# idhook

> Generate unique ids to use in your HTML with a very intuitive API.

[![NPM](https://img.shields.io/npm/v/idhook.svg)](https://www.npmjs.com/package/idhook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save idhook
```

## Usage

```tsx
import React from "react";

import { useUniqueId } from "idhook";

const App = () => {
  const id = useUniqueId();
  return (
    <form>
      <label htmlFor={id("name")}>Name</label>
      <input id={id("name")} name="name" />

      <label htmlFor={id("email")}>Name</label>
      <input id={id("email")} name="email" />
    </form>
  );
};
```

## Typescript

Works out of the box.

## License

MIT © [anilanar](https://github.com/anilanar)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
