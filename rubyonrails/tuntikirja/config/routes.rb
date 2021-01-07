Rails.application.routes.draw do
  namespace "api" do
    resources :jobs do
      get 'notes/:order_by', to: 'notes#order_by'
      resources :notes
    end
  end
end
