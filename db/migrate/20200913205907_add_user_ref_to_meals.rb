class AddUserRefToMeals < ActiveRecord::Migration[6.0]
  def change
    add_reference :meals, :user, null: false, foreign_key: true
  end
end
