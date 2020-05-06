class AddNumberToMeal < ActiveRecord::Migration[6.0]
  def change
    add_column :meals, :number, :integer, null: false, unique: true
  end
end
