require 'rails_helper'

RSpec.describe Api::V1::ContentController, type: :controller do
  describe 'GET #index' do
    context 'when the request is successful' do
      before do
        allow(Content).to receive_message_chain(:where, :order).and_return([Content.new(id: 1)])

        get :index
      end

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end
    end

    context 'when there is an error' do
      before do
        allow(Content).to receive_message_chain(:where, :order).and_raise(ActiveRecord::ActiveRecordError.new('Error'))

        get :index
      end

      it 'returns http internal server error' do
        expect(response).to have_http_status(:bad_request)
      end
    end
  end

  describe 'PUT #update' do
    let(:update_params) { { id: '1', is_streaming: 'false' } }
    context 'when the request is successful' do
      let(:content) { Content.new(id: 1) }
      let(:permitted_params) { ActionController::Parameters.new(update_params).permit(:id, :is_streaming) }
      before do
        allow(Content).to receive(:find).and_return(content)
        allow(content).to receive(:update!).with(permitted_params).and_return(true)

        put :update, params: update_params
      end

      it 'returns http no_content' do
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when there is an error' do
      before do
        allow(Content).to receive(:find).and_raise(ActiveRecord::RecordNotFound.new('Record not found'))

        put :update, params: update_params
      end

      it 'returns http internal server error' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
