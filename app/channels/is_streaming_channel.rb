class IsStreamingChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'is_streaming_channel'
  end
end
