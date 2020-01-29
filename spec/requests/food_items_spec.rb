require 'rails_helper'

RSpec.describe "FoodItems", type: :request do
  let(:food_item) { food_item = create(:food_item) }

  let(:valid_attributes) { attributes_for(:food_item) }

  describe "GET /food_items" do
    it "returns a success response" do
      get food_items_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /food_items/1" do
    it "returns a success response" do
      get food_item_path(food_item)
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /food_items/new" do
    it "returns a success response" do
      get new_food_item_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /food_items/1/edit" do
    it "returns a success response" do
      get edit_food_item_path(food_item)
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /food_items" do
    it "creates the requested food_item" do
      expect {
        post "/food_items", params: { food_item: valid_attributes }
      }.to change(FoodItem, :count).by(1)
    end

    it "returns a success response" do
      post "/food_items", params: { food_item: valid_attributes }
      expect(response).to redirect_to(food_item_path(FoodItem.last))
    end
  end

  describe "PATCH/PUT /food_items/1" do
    it "redirects to the food item" do
      patch "/food_items/#{food_item.id}", params: { food_item: valid_attributes }
      expect(response).to redirect_to(food_item_path)
    end
  end

  describe "DELETE /food_items/1" do
    it "destroys the requested food_item" do
      food_item
      expect {
        delete "/food_items/#{food_item.id}"
      }.to change(FoodItem, :count).by(-1)
    end

    it "redirects to the food_items list" do
      delete "/food_items/#{food_item.id}"
      expect(response).to redirect_to(food_items_url)
    end
  end
end
