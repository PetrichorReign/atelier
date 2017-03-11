import React from 'react';
import ReactDOM from 'react-dom';
import Content from './Content';
import { Server } from 'mock-socket';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';

describe('<Content />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    new Server('ws://localhost:3001/cable');
    ReactDOM.render(<Content />, div);
  });

  describe('loadContent', () => {
    const content = new Content();
    const $ = require('jquery');
    var node;

    it('makes an ajax call to load content', () => {
      $.ajax = jest.genMockFunction().mockImplementation(function (request) {
        expect(request.url).toBe('/api/content');
      });
      content.loadContent();
    });

    describe('when the ajax call is successful', () => {
      describe('when the response is empty', () => {
        beforeEach(() => {
          $.ajax = jest.genMockFunction().mockImplementation(function (request) {
            var response;
            if (request.url == '/api/content') {
              response = [];
            } else {
              console.log('Unexpected URL call: ' + request.url);
            }
            request.success(response);
          });
          node = TestUtils.renderIntoDocument(<Content />);
        });

        it('does not set state for errorFetchingContentData to true', () => {
          expect(node.state.errorFetchingContentData).toBeFalsy();
        });

        it('content data is set to an empty array', () => {
          expect(node.state.data.length).toBe(0);
        });
      });

      describe('when the response is not empty', () => {
        var contentArray = [{
          id: 1,
          title: 'test',
          maturity: 'test-ma',
          release_year: 2020,
          is_streaming: true,
          box_art_url: 'http://foo.jpg'
        }];
        beforeEach(() => {
          $.ajax = jest.genMockFunction().mockImplementation(function (request) {
            var response;
            if (request.url == '/api/content') {
              response = contentArray;
            } else {
              console.log('Unexpected URL call: ' + request.url);
            }
            request.success(response);
          });
          node = TestUtils.renderIntoDocument(<Content />);
        });

        it('does not set state for errorFetchingContentData to true', () => {
          expect(node.state.errorFetchingContentData).toBeFalsy();
        });

        it('content data data is set to the response array', () => {
          expect(node.state.data).toBe(contentArray);
        });
      });
    });

    describe('when the ajax call fails', () => {
      beforeEach(() => {
        $.ajax = jest.genMockFunction().mockImplementation(function (request) {
          request.error();
        });
        node = TestUtils.renderIntoDocument(<Content />);
      });

      it('sets the state for errorFetchingContentData to true', () => {
        expect(node.state.errorFetchingContentData).toBeTruthy();
      });

      it('content data is set to an empty array', () => {
        expect(node.state.data.length).toBe(0);
      });
    });
  });
});
