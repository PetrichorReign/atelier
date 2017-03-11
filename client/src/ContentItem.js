import React, { Component } from 'react';
import $ from 'jquery';

export default class ContentItem extends Component {

  updateIsStreaming(event) {
    var $contentItem = $(event.target).closest('.content-item'),
        contentItemId = $contentItem.attr('id'),
        isStreamingValue = $contentItem.find('.is-streaming').text(),
        $alertSpan = $('.alert span'),
        $alert = $('.alert');

    event.preventDefault();
    $alertSpan.text('');
    $alert.removeClass('alert-error alert-info').removeAttr('style');

    $.ajax({
      type: 'PUT',
      url: '/api/content/' + contentItemId,
      data: { is_streaming: isStreamingValue === 'Streaming' ? 'false' : 'true' },
      error: function() {
        $alertSpan.text('Something went wrong while updating content');
        $alert.addClass('alert-error').delay(5000).fadeOut('slow');
      }
    });
  }

  render() {
    var content = this.props.content,
        buttonText, streamingText;

    buttonText = content.is_streaming ? 'Stop Streaming' : 'Start Streaming';
    streamingText = content.is_streaming ? 'Streaming' : 'Not Streaming';

    return(
      <div className={'content-item responsive is-streaming-' + content.is_streaming} id={content.id}>
        <img src={content.box_art_url} alt={content.title} className='img-responsive'/>
        <div className='content-details'>
          <h3 className='content-details-title'>{content.title}</h3>
          <div className='content-attributes'>
            <div className='maturity-rating content-attribute'>
              <span>{content.maturity}</span>
            </div>
            <div className='release-year content-attribute'>
              <span>{content.release_year}</span>
            </div>
            <div className='is-streaming content-attribute'>
              <span>{streamingText}</span>
            </div>
          </div>
          <div className='is-streaming-button'>
            <button className='button' onClick={this.updateIsStreaming.bind(this)}>
              <span className='button-text'>{buttonText}</span>
            </button>
          </div>
        </div>
        <div className='update-content-stream'>
        </div>
      </div>
    );
  }
}
