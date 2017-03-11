require 'rails_helper'

RSpec.describe IsStreamingUpdateEventBroadcastJob, type: :job do
  include ActiveJob::TestHelper

  describe '#perform' do
    it 'queues the job' do
      expect do
        IsStreamingUpdateEventBroadcastJob.perform_later(1, false)
      end.to change(ActiveJob::Base.queue_adapter.enqueued_jobs, :size).by(1)
    end

    context 'when executing the job' do
      after do
        IsStreamingUpdateEventBroadcastJob.perform_now(1, false)
      end

      it 'executes perform' do
        expect(ActionCable)
          .to receive_message_chain(:server, :broadcast)
          .with('is_streaming_channel', id: 1, is_streaming: false)
      end
    end
  end
end
