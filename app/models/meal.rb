# frozen_string_literal: true

# Meal model
class Meal < ApplicationRecord
  validates :number,
    presence:     true,
    uniqueness:   true,
    numericality: { only_integer: true, less_than: 11 }

  has_and_belongs_to_many :food_items

  # def self.reorder_meal_numbers
  #   meals = Meal.all

  #   meals.each {|meal|
  #     accu += accu
  #     return if meal.id == accu
  #   }
  # end
end
