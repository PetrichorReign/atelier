class IsStreamingUpdateEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(id, is_streaming)
    ActionCable.server.broadcast(
      'is_streaming_channel', id: id, is_streaming: is_streaming
    )
  end
end
