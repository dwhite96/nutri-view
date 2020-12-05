# frozen_string_literal: true

# Meal model
class Meal < ApplicationRecord
  validates :number,
            presence: true,
        numericality: { only_integer: true, less_than: 11 }

  belongs_to :user

  has_many :meal_food_items, dependent: :destroy

  has_many :food_items, through: :meal_food_items

  def self.reorder_meal_numbers(meals)
    meals.each_with_index do |meal, index|
      index += 1
      meal.update_attribute(:number, index)
    end
  end

  def self.generate_meal_number(current_user)
    if current_user.meals.empty?
      1
    else
      current_user.meals.last.number + 1
    end
  end
end
