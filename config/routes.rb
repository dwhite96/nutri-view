Rails.application.routes.draw do
  root 'meals#index'

  resources :food_items do
    get 'search_data', on: :collection
  end

  resources :meals, except: [:new, :edit, :show]

  post '/meal_food_items', to: 'meal_food_items#create'

  delete '/meal_food_items', to: 'meal_food_items#destroy'

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
end
