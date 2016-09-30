const test = require('tape')
const React = require('react')
const { shallow } = require('enzyme')

const createForm = require('../src')

const h = React.createElement

test('expect-react-form', t => {
  t.test('should render a Form component', t => {
    let req = {}
    let res = {}
    const action = '/test'
    const method = 'post'
    const encType = 'application/x-www-form-urlencoded'
    const Form = createForm(req, res)
    const wrapper = shallow(h(Form, { action, method, encType }))
    t.equal(wrapper.find('form').html(), `<form action="${action}" method="${method}" enctype="${encType}"></form>`, 'form element exists')
    t.end()
  })

  t.test('should render a Form component with a csrf', t => {
    let req = {
      csrf: 'test'
    }
    let res = {}
    const action = '/test'
    const method = 'post'
    const encType = 'application/x-www-form-urlencoded'
    const Form = createForm(req, res)
    const wrapper = shallow(h(Form), { action, method, encType })
    t.equal(wrapper.find('input[name="_csrf"]').html(), `<input type="hidden" name="_csrf" value="${req.csrf}"/>`, 'form element exists')
    t.end()
  })

  t.test('should render a Form component with a csrf query with a multipart/form-data', t => {
    let req = {
      csrf: 'test'
    }
    let res = {}
    const action = '/test'
    const method = 'post'
    const encType = 'multipart/form-data'
    const Form = createForm(req, res)
    const wrapper = shallow(h(Form, { action, method, encType }))
    t.equal(wrapper.find('form').node.props.action, `${action}?_csrf=${req.csrf}`, 'form element exists')
    t.end()
  })
})
