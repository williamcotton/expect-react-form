const React = require('react')

const createForm = (req, res) => {
  var Form = React.createClass({
    propTypes: {
      action: React.PropTypes.string,
      method: React.PropTypes.string,
      encType: React.PropTypes.string,
      children: React.PropTypes.array
    },
    render: function () {
      const encType = this.props.encType || ''
      const action = encType === 'multipart/form-data' && req.csrf ? this.props.action + '?_csrf=' + req.csrf : this.props.action
      const method = this.props.method

      let formChildren = []
      if (req.csrf) formChildren.push(React.createElement('input', { key: req.csrf, type: 'hidden', name: '_csrf', value: req.csrf }))
      formChildren.push(this.props.children)

      return React.createElement('form', { action, method, encType, className: this.props.className }, formChildren)
    }
  })
  return Form
}

module.exports = createForm
