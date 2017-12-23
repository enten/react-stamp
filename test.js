const React = require('react')
const ReactDOM = require('react-dom/server')
const {compose} = require('.')

const Component = compose(React.Component)

const h = React.createElement

const Button = ({disabled, onClick, value}) => (
  h('input', {
    type: 'button',
    disabled,
    onClick,
    value
  })
)

const Text = ({value}) => (
  h('div', {
    children: value
  })
)

const ToggleBehavior = compose({
  componentWillMount () {
    this.setState({
      clickable: true
    })
  },

  onToggle () {
    this.setState({
      toggled: !this.state.toggled
    })
  }
})

const Spoiler = compose(Component, ToggleBehavior, {
  state: {
    toggled: true
  },

  render () {
    const {text} = this.props
    const {
      clickable,
      toggled
    } = this.state

    return h('div', null,
      h(Button, {
        disabled: !clickable,
        onClick: (e) => this.onToggle && this.onToggle(e),
        value: toggled ? 'hide' : 'show'
      }),
      toggled && h(Text, {
        value: text
      })
    )
  }
})

console.log(
  ReactDOM.renderToString(
    React.createElement(Spoiler, {
      text: 'Hello, world!'
    })
  )
)
