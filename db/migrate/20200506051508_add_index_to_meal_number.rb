class AddIndexToMealNumber < ActiveRecord::Migration[6.0]
  def change
    add_index :meals, :number, unique: true
  end
end
