Rails.application.routes.draw do
  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: :json } do
    scope module: :v1 do
      resources :content, only: [:index, :update]
    end
  end
end
