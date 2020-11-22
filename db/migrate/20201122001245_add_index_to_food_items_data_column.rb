class AddIndexToFoodItemsDataColumn < ActiveRecord::Migration[6.0]
  def change
    add_index :food_items, :data, using: :gin
  end
end
