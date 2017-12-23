# react-stamp

> Stamp for React

## Install

```shell
npm install @enten/react-stamp --save
```

## Usage

```javascript
import React from 'react'
import {compose} from '@enten/react-stamp'

const Component = compose(React.Component)
```

## Example

```javascript
import React from 'react'
import {compose} from '@enten/react-stamp'

const Component = compose(React.Component)

const HelloWho = Component.compose({
  render () {
    return `Hello ${this.props.who}`
  }
})

const HelloWorld = HelloWho.compose({
  defaultProps: {
    who: 'world'
  }
})

React.render(<HelloWorld />)
```

## License

[MIT](./LICENSE)