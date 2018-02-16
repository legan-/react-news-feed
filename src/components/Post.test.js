import React from 'react';
import { shallow } from 'enzyme'
import Post from './Post';


const setup = (title, url, image) => {
  const component = shallow(
    <Post title={ title } url={ url } img={ image } />
  )

  return {
    component: component,
    titleSpan: component.find('.title span'),
    image: component.find('img')
  }
}

describe('Post component', () => {
  const post = () => ({
    title: 'Re-Targeting to Pre-Targeting',
    original_url: 'http://www.idioplatform.com/blog/moving-from-retargeting-to-pretargeting/',
    main_image_url: '//i.idio.co/idio/iV'
  })

  it('should display title', () => {
    const {
      title,
      original_url,
      main_image_url
    } = post()

    const {
      component,
      titleSpan
    } = setup(title, original_url, main_image_url)

    expect(titleSpan.text()).toMatch(title)
  })

  it('should have link', () => {
    const {
      title,
      original_url,
      main_image_url
    } = post()

    const {
      component
    } = setup(title, original_url, main_image_url)

    expect(component.props().href).toMatch(original_url)
  })

  describe('image', () => {
    it('should display image', () => {
      const {
        title,
        original_url,
        main_image_url
      } = post()

      const {
        component,
        image
      } = setup(title, original_url, main_image_url)

      expect(image.props().src).toMatch(main_image_url)
    })

    it('should display default image', () => {
      const {
        title,
        original_url,
        main_image_url
      } = post()

      const {
        component,
        image
      } = setup(title, original_url, null)

      expect(image.props().src).toMatch(/^no-image.png/)
    })
  })
})