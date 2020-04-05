# frozen_string_literal: true

# FoodItem model
class FoodItem < ApplicationRecord
  validates :data, presence: true
end
