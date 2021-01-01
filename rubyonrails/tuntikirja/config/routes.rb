Rails.application.routes.draw do
  namespace "api" do
    resources :jobs do
      resources :notes
    end
  end
end
