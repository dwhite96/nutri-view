class ChangeFoodItemsDataColumnNull < ActiveRecord::Migration[6.0]
  def change
    change_column_default :food_items, :data, from: nil, to: {}
    change_column_null :food_items, :data, false
  end
end
