import React from 'react';
import ReactDOM from 'react-dom';
import ContentItem from './ContentItem';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

describe('<ContentItem />', () => {
  const item = {
    id: 1,
    title: 'test',
    maturity: 'test-ma',
    release_year: 2020,
    is_streaming: true,
    box_art_url: 'http://foo.jpg'
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContentItem key={0} content={item}/>, div);
  });

  describe('updateIsStreaming', () => {
    beforeEach(() => {
      var component = TestUtils.renderIntoDocument(<ContentItem key={0} content={item}/>);
      var updateStreamButton = TestUtils.findRenderedDOMComponentWithClass(component, "button");

      TestUtils.Simulate.click(updateStreamButton);
    });

    it('makes an ajax call to update content', () => {
      $.ajax = jest.genMockFunction().mockImplementation(function (request) {
        expect(request.url).toBe('/api/content/1');
        expect(request.data).toBe({is_streaming: false});
      });
    });
  });
});
