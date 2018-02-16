import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

import Post from '../components/Post';
import { getLink } from '../actions';


class App extends Component {
  constructor() {
    super()
    this.state = {
      content:  [],     // Content from the API
      topic:    737,    // id of topic
      page:     1,      // Page number
      limit:    3,      // Number of posts per screen: 0 - unlimited
      isLoaded: false   // Whether we've got response from the API
    }
  }

  componentDidMount() {
    const { topic, page } = this.state

    // Get the link from ./actions with the topic's id and page number from this.state
    // TODO: put request to an 'api' folder like in the thousand eyes task.
    const link = getLink(topic, page)
    $.ajax({
      url:      link,
      dataType: 'jsonp',
      success:  (data) => {
        const { content = [] } = data
        // Set state with data we've received
        this.setState({
          content,
          isLoaded: true
        })
      },
      error: (data) => {
        this.setState({
          isLoaded: true
        })
      }
    })
  }

  render() {
    let node = ''

    // Whether the content has been received
    if (this.state.content.length > 0) {

      // Whether state.limit is set
      const sliced = this.state.limit > 0 ? (
        this.state.content.slice(0, this.state.limit)
      ) : (
        this.state.content
      )

      // Build a <Post /> component with props
      node = sliced.map((content) => {
        const { id, title, original_url, main_image_url } = content
        return <Post key={ id } title={ title } url={ original_url } img={ main_image_url } />
      })

    } else {
      node = (
        <div className='message'>
          {
            this.state.isLoaded ? (
              'Could not load posts'
            ) : (
              'Loading...'
            )
          }
        </div>
      )
    }

    return (
      <div className='feed'>
        <div className='container'>
          { node }
        </div>
      </div>
    );
  }
}

export default App;
