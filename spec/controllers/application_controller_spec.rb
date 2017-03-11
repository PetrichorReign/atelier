require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  context 'when controller raises an error' do
    controller do
      def index
        raise StandardError
      end
    end

    before do
      get :index
    end

    it 'returns http internal_server_error' do
      expect(response).to have_http_status(:internal_server_error)
    end
  end

  describe '#render_or_error' do
    context 'when an ActiveRecord::ActiveRecordError is raised' do
      controller do
        def index
          render_or_error { raise ActiveRecord::ActiveRecordError }
        end
      end

      before do
        get :index
      end

      it 'returns http bad_request' do
        expect(response).to have_http_status(:bad_request)
      end

      it 'returns a json error message' do
        expect(JSON.parse(response.body)).to include('message', 'stack')
      end
    end
  end
end
