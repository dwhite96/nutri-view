class AddDataToFoodItems < ActiveRecord::Migration[6.0]
  def change
    add_column :food_items, :data, :jsonb
  end
end
