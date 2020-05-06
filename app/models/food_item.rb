# frozen_string_literal: true

# FoodItem model
class FoodItem < ApplicationRecord
  validates :data, presence: true

  has_and_belongs_to_many :meals
end
