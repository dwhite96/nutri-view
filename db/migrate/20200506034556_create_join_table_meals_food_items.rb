class CreateJoinTableMealsFoodItems < ActiveRecord::Migration[6.0]
  def change
    create_join_table :meals, :food_items do |t|
      t.index [:meal_id, :food_item_id]
      t.index [:food_item_id, :meal_id]
    end
  end
end
