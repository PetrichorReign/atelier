# == Schema Information
# Table name: Content
#
# title        :string    not null        index: true
# maturity     :string    not null
# box_art_url  :text      not null
# release_year :integer   not null
# is_streaming :boolean   default: false
# created_at   :datetime  not null
# updated_at   :datetime  not null
#
class Content < ApplicationRecord
  validates_presence_of :title, :maturity, :release_year

  after_update_commit :broadcast_is_streaming

  private

  def broadcast_is_streaming
    return unless previous_changes.include?('is_streaming')

    # To enable sidekiq queue and perform_later,
    # run sidekiq before starting server 'bundle exec sidekiq'
    IsStreamingUpdateEventBroadcastJob.perform_now(id, is_streaming)
  end
end
