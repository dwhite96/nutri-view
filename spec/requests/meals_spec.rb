require 'rails_helper'

RSpec.describe "Meals", type: :request do
  let(:meal) { meal = create(:meal) }

  let(:valid_attributes) { attributes_for(:meal) }

  describe "GET /meals" do
    it "returns a success response" do
      get meals_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /meals/1" do
    it "returns a success response" do
      get meal_path(meal)
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /meals/new" do
    it "returns a success response" do
      get new_meal_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /meals/1/edit" do
    it "returns a success response" do
      get edit_meal_path(meal)
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /meals" do
    it "creates the requested meal" do
      expect {
        post "/meals", params: { meal: valid_attributes }
      }.to change(Meal, :count).by(1)
    end

    it "returns a success response" do
      post "/meals", params: { meal: valid_attributes }
      expect(response).to redirect_to(meal_path(Meal.last))
    end
  end

  describe "PATCH/PUT /meals/1" do
    it "redirects to the food item" do
      patch "/meals/#{meal.id}", params: { meal: valid_attributes }
      expect(response).to redirect_to(meal_path)
    end
  end

  describe "DELETE /meals/1" do
    it "destroys the requested meal" do
      meal
      expect {
        delete "/meals/#{meal.id}"
      }.to change(Meal, :count).by(-1)
    end

    it "redirects to the meals list" do
      delete "/meals/#{meal.id}"
      expect(response).to redirect_to(meals_url)
    end
  end
end
