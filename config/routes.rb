Rails.application.routes.draw do
  root 'meals#index'

  resources :food_items do
    get 'search_data', on: :collection
  end

  resources :meals, except: [:new, :edit, :show] do
    member do
      patch 'add_food_item'
      patch 'remove_food_item'
    end
  end

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
end
