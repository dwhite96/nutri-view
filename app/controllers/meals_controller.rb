class MealsController < ApplicationController
  before_action :set_meal, only: [:show, :edit, :update, :destroy]

  # GET /meals
  # GET /meals.json
  def index
    @meals = Meal.includes(:food_items).all

    json_meals = { data: @meals.as_json(include: :food_items) }

    redux_store("configureStore", props: json_meals)
  end

  # GET /meals/1
  # GET /meals/1.json
  def show
  end

  # GET /meals/new
  def new
    @meal = Meal.new
  end

  # GET /meals/1/edit
  def edit
  end

  # POST /meals
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

  # PATCH/PUT /meals/1
  # PATCH/PUT /meals/1.json
  def update
    if params[:meal][:food_item_id]
      @meal.food_items << FoodItem.find(params[:meal][:food_item_id].to_i)
    end

    if @meal.save
      render json: { meal: @meal, message: 'Meal was successfully updated.' },
      include: :food_items,
      status: :ok
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meals/1
  # DELETE /meals/1.json
  def destroy
    @meal.destroy
    respond_to do |format|
      format.html { redirect_to meals_url, notice: 'Meal was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_meal
      @meal = Meal.find(params[:id])
    end

    def meal_params
      params.require(:meal).permit(:number, :food_item_id)
    end
end
