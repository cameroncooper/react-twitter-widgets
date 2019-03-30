import React from 'react'
import PropTypes from 'prop-types'
import AbstractWidget from './AbstractWidget'

const isEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const cloneDeep = (a) => JSON.parse(JSON.stringify(a));

export default class Share extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    options: PropTypes.object,
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    options: {},
    onLoad: () => {},
  };

  shouldComponentUpdate(nextProps) {
    const changed = (name) => !isEqual(this.props[name], nextProps[name])
    return changed('url') || changed('options')
  }

  ready = (tw, element, done) => {
    const { url, options, onLoad } = this.props

    // Options must be cloned since Twitter Widgets modifies it directly
    tw.widgets.createShareButton(url, element, cloneDeep(options))
    .then(() => {
      // Widget is loaded
      done()
      onLoad()
    })
  }

  render() {
    return React.createElement(AbstractWidget, { ready: this.ready })
  }
}
