# frozen_string_literal: true

# Meal model
class Meal < ApplicationRecord
  validates :food_item, presence: true
  validates :number,
    presence:     true,
    uniqueness:   true,
    numericality: { only_integer: true, less_than: 11 }

  has_and_belongs_to_many :food_items
end
