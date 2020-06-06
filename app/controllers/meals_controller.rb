class MealsController < ApplicationController
  before_action :set_meal, only: [
    :update,
    :add_food_item,
    :remove_food_item,
    :destroy
  ]

  # GET /meals.json
  def index
    @meals = Meal.includes(:food_items).all

    json_meals = { data: @meals.as_json(include: :food_items) }

    redux_store("configureStore", props: json_meals)
  end

  # POST /meals.json
  def create
    @meal = Meal.new(meal_params)

    if @meal.save
      render json: { meal: @meal, message: 'Meal was successfully saved.' },
        include: :food_items,
        status: :created
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meals/1.json
  def update
    if @meal.save
      render json: { meal: @meal, message: 'Meal was successfully updated.' },
        include: :food_items,
        status: :ok
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meals/1.json
  def add_food_item
    @meal.food_items << FoodItem.find(params[:meal][:food_item_id].to_i)

    render json: { meal: @meal, message: 'Food item was successfully added to meal.' },
      include: :food_items,
      status: :ok
  end

  # PATCH/PUT /meals/1/add_food_item.json
  def remove_food_item
    @meal.food_items.delete FoodItem.find(params[:meal][:food_item_id].to_i)

    render json: { meal: @meal, message: 'Food item was successfully removed from meal.' },
      include: :food_items,
      status: :ok
  end

  # DELETE /meals/1.json
  def destroy
    @meal.destroy

    render json: { mealId: @meal.id, message: 'Meal was successfully destroyed.' }
  end

  private
    def set_meal
      @meal = Meal.find(params[:id])
    end

    def meal_params
      params.require(:meal).permit(:number, :food_item_id)
    end
end
