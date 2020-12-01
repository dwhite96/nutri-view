class MealFoodItemsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_meal, only: %i[create destroy]

  before_action :set_food_item, only: %i[create destroy]

  # POST /meal_food_items
  def create
    @meal_food_item = @meal.meal_food_items.build(meal_food_item_params)

    if @meal_food_item.save
      render json: { mealFoodItem: { mealFoodItem: @meal_food_item },
         foodItem: { foodItem: @food_item },
          message: 'Food item was successfully added to meal.' },
           status: :ok
    else
      render json: @meal_food_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meal_food_items
  def destroy
    meal_food_item = @meal.meal_food_items.find_by(food_item_id: @food_item.id)

    meal_food_item_id = meal_food_item.id

    servings = meal_food_item.servings

    meal_food_item.destroy

    render json: { meal: @meal, mealFoodItemId: meal_food_item_id, servings: servings,
        message: 'Food item was successfully removed from meal.' },
         status: :ok
  end

  private
    def set_meal
      @meal = Meal.find(params[:meal_food_item][:meal_id])
    end

    def set_food_item
      @food_item = FoodItem.find(params[:meal_food_item][:food_item_id])
    end

    def meal_food_item_params
      params.require(:meal_food_item).permit(:meal_id, :food_item_id, :servings)
    end
end
