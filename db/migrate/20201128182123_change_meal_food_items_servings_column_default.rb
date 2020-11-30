class ChangeMealFoodItemsServingsColumnDefault < ActiveRecord::Migration[6.0]
  def change
    change_column_default :meal_food_items, :servings, from: "0.0", to: 1.00
  end
end
