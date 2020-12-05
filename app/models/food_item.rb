# frozen_string_literal: true

# FoodItem model
class FoodItem < ApplicationRecord
  include PgSearch::Model

  validates :data, presence: true

  has_many :meal_food_items, dependent: :destroy

  has_many :meals, through: :meal_food_items

  pg_search_scope :search_data, against: :data
end
