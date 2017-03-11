require 'rails_helper'

RSpec.describe Content, type: :model do
  describe '#broadcast_is_streaming' do
    let(:content) { Content.create(id: 1, title: 'test', release_year: 2020, maturity: 'test', is_streaming: true) }
    context 'when attribute is_streaming is updated' do
      after do
        content.update!(is_streaming: false)
      end

      it 'executes the IsStreamingUpdateEventBroadcastJob' do
        expect(IsStreamingUpdateEventBroadcastJob).to receive(:perform_now).with(content.id, false).once
      end
    end
  end
end
