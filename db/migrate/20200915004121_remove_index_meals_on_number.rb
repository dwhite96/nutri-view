class RemoveIndexMealsOnNumber < ActiveRecord::Migration[6.0]
  def change
    remove_index :meals, :number
  end
end
