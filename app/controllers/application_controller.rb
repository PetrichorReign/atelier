class ApplicationController < ActionController::API
  rescue_from StandardError, with: :internal_server_error

  def internal_server_error
    render status: :internal_server_error
  end

  # Internal: renders a json version of the object returned by the block passed in,
  # or a 404 (Not Found) if the object was blank,
  # or a 400 (Bad Request) if the call was bad
  #
  # status - an optional http status code or symbol. Defaults to 200 (ok)
  #
  # examples
  # render_or_error { Content.where(params) }
  # render_or_error(:no_content) { Content.update(params) }
  #
  # Doesn't return anything, instead uses rails' render method
  def render_or_error(status = :ok)
    # run the block passed in, and assign its return value to object.
    # This method will fail loudly if not passed a block.
    object = yield

    render json: object, status: status
  rescue ActiveRecord::RecordNotFound => error
    render json: { message: error.message, stack: error.backtrace }, status: :not_found
  rescue ActiveRecord::ActiveRecordError,
         ActiveRecord::UnknownAttributeError,
         ActiveRecord::ForbiddenAttributesError => error

    render json: { message: error.message, stack: error.backtrace }, status: :bad_request
  end
end
