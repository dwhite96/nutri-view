class ChangeFoodItemsMealsJoinTable < ActiveRecord::Migration[6.0]
  def change
    drop_join_table :meals, :food_items

    create_table :meal_food_items do |t|
      t.decimal :servings, precision: 8, scale: 2, default: 0.0, null: false
      t.belongs_to :meal, null: false
      t.belongs_to :food_item, null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end
  end
end
