# frozen_string_literal: true

# MealFoodItem Model
class MealFoodItem < ApplicationRecord
  validates :servings, presence: true, numericality: true

  belongs_to :meal
  belongs_to :food_item
end
