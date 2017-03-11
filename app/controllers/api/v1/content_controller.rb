module Api
  module V1
    class ContentController < ApiController
      def index
        render_or_error { Content.where(content_params).order(:title) }
      end

      def update
        render_or_error(:no_content) do
          content = Content.find(params[:id])
          content.update!(content_params)
        end
      end

      private

      def content_params
        params.permit(*Content.new.attributes.keys)
      end
    end
  end
end
