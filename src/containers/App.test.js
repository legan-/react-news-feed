import React from 'react';
import { shallow } from 'enzyme'
import App from './App';


const setup = () => {
  const component = shallow(<App />)

  return {
    component: component,
    feed: component.find('.feed'),
    container: component.find('.container')
  }
}

describe('App Component', () => {
  it('should display ".feed"', () => {
    const { feed } = setup()
    expect(feed.exists()).toBe(true)
  })

  it('should display ".container"', () => {
    const { container } = setup()
    expect(container.exists()).toBe(true)
  })

  describe('when content not given', () => {
    const state = (isLoaded) => {
      return { 
        content: [],
        isLoaded
      }
    }

    it('should show "loading" message', () => {
      const { component } = setup()
      component.setState(state(false))
      expect(component.find('.message').text()).toMatch(/^Loading.../)
    })

    it('should show "not found" message', () => {
      const { component } = setup()
      component.setState(state(true))
      expect(component.find('.message').text()).toMatch(/^Could not load posts/)
    })
  })

  describe('when given content', () => {
    const state = (limit) => {
      return { 
        content: [
          { 
            id: '2292',
            title: 'FinTech Weekly Summary | January 10 - 17',
            original_url: 'http://www.idioplatform.com/blog/fintech-weekly-summary-january-10-17/',
            main_image_url: null
          },
          {
            id: '2210',
            title: 'Re-Targeting to Pre-Targeting',
            original_url: 'http://www.idioplatform.com/blog/moving-from-retargeting-to-pretargeting/',
            main_image_url: '//i.idio.co/idio/iV'
          },
          {
            id: '2201',
            title: 'How to prioritize sales leads by using content',
            original_url: 'http://www.idioplatform.com/blog/prioritize-sales-leads-content/',
            main_image_url: null
          }
        ],
        isLoaded: true,
        limit
      }
    }

    it('should display limited number of posts', () => {
      const { component } = setup()
      component.setState(state(0))
      expect(component.render().find('.post').length).toBe(3)
    });

    it('should display unlimited number of posts', () => {
      const { component } = setup()
      component.setState(state(2))
      expect(component.render().find('.post').length).toBe(2)
    });
  })
});