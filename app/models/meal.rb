# frozen_string_literal: true

# Meal model
class Meal < ApplicationRecord
  has_and_belongs_to_many :food_items
end
