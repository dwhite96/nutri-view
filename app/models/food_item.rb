# frozen_string_literal: true

# FoodItem model
class FoodItem < ApplicationRecord
  validates :data, presence: true

  has_many :meal_food_items
  has_many :meals, through: :meal_food_items
end
