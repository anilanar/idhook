# idhook

> Create unique ids to use in your HTML with a very intuitive API.

[![NPM](https://img.shields.io/npm/v/idhook.svg)](https://www.npmjs.com/package/idhook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save idhook
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'idhook'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [anilanar](https://github.com/anilanar)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
