class MealsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_meal, only: %i[update destroy]

  # GET /meals
  def index
    @meals = current_user.meals
                         .includes(:food_items, :meal_food_items)
                         .order(:number)
                         .all

    json_meals = { data: @meals.as_json(include: [:food_items, :meal_food_items]) }

    redux_store('configureStore', props: json_meals)

    respond_to do |format|
      format.html
      format.json { render plain: { success: true }.to_json,
                          status: :found,
                    content_type: 'application/json' }
    end
  end

  # POST /meals
  def create
    if current_user.meals.empty?
      last_meal_number = 0
    else
      last_meal_number = current_user.meals.last.number
    end

    @meal = current_user.meals.build
    @meal.add_new_meal_number(last_meal_number)

    if @meal.save
      render json: { meal: @meal,
          message: 'Meal was successfully saved.' },
          include: :food_items,
           status: :created
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meals/1
  def update
    if @meal.save
      render json: { meal: @meal,
          message: 'Meal was successfully updated.' },
          include: :food_items,
           status: :ok
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meals/1
  def destroy
    @meal.destroy

    @meals = current_user.meals.includes(:food_items).order(:number).all

    Meal.reorder_meal_numbers(@meals)

    render json: { meal: @meal,
          meals: @meals,
         status: :found,
        message: 'Meal was successfully destroyed.' }
  end

  private
    def set_meal
      @meal = Meal.find(params[:id])
    end

    def meal_params
      params.require(:meal).permit(:number, :food_item_id)
    end
end
