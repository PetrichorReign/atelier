import React, { Component } from 'react';
import './Content.css';
import ContentItem from './ContentItem';
import ActionCable from 'actioncable';
import $ from 'jquery';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      mounted: false,
      actionCable: {},
      errorFetchingContentData: false
    };
  }

  loadContent() {
    var contentInstance = this;

    $.ajax({
      type: 'GET',
      url: '/api/content',
      success: function(data) {
        if(data.length <= 0) {
          $('.alert span').text('No content found');
          $('.alert').addClass('alert-info');
        } else {
          contentInstance.setState({data: data});
        }
      },
      error: function() {
        contentInstance.setState({data: [], errorFetchingContentData: true});
      }
    });
  };

  setSubscription(actionCable) {
    actionCable.is_streaming = actionCable.subscriptions.create("IsStreamingChannel", {
      connected: function () {
        // Only for development
        console.log('Websocket connected');
      },
      disconnected: function () {
        // Only for development
        console.log('Websocket Terminated, please refresh page');
        actionCable.disconnect();
      },
      received: function (data) {
        var $contentItem = $(".content-item#" + data.id),
            buttonText, streamingText;

        // Only for development
        console.log('Update received from server');

        buttonText = data.is_streaming ? 'Stop Streaming' : 'Start Streaming';
        streamingText = data.is_streaming ? 'Streaming' : 'Not Streaming';
        $contentItem.removeClass('is-streaming-false is-streaming-true').addClass('is-streaming-'+ data.is_streaming);
        $contentItem.find('.is-streaming').text(streamingText);
        $contentItem.find('.is-streaming-button .button-text').text(buttonText);
      }
    });
  }

  componentWillMount() {
    this.loadContent();
  }

  componentDidMount() {
    var actionCable = {};
    actionCable.cable = ActionCable.createConsumer('ws://localhost:3001/cable');
    this.setSubscription(actionCable.cable);
    this.setState({mounted: true});
  }

  render() {
    var $alertSpan = $('.alert span'),
        $alert = $('.alert'),
        contentItems = [];

    if(this.state.errorFetchingContentData) {
      $alertSpan.text('Something went wrong while fetching content');
      $alert.addClass('alert-error');
    } else {
      contentItems = this.state.data.map(function (item, index) {
        return <ContentItem key={index} content={item}/>
      });
    }

    return (
      <div className='content'>
        {contentItems}
      </div>
    );
  };
}
