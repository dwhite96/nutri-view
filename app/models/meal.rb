# frozen_string_literal: true

# Meal model
class Meal < ApplicationRecord
  validates :number,
            presence: true,
        numericality: { only_integer: true, less_than: 11 }

  has_many :meal_food_items
  has_many :food_items, through: meal_food_items

  def self.reorder_meal_numbers(meals)
    meals.each_with_index do |meal, index|
      index += 1
      meal.update_attribute(:number, index)
    end
  end

  def add_new_meal_number(previous_meal_number)
    self.number = previous_meal_number + 1
  end
end
