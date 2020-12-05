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
    new_meal_number = Meal.generate_meal_number(current_user)

    @meal = current_user.meals.build(number: new_meal_number)

    if @meal.save
      render json: { meal: @meal.as_json(include: [:food_items, :meal_food_items]),
          message: 'Meal was successfully saved.',
           status: :created }
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meals/1
  def update
    if @meal.save
      render json: { meal: @meal.as_json(include: [:food_items, :meal_food_items]),
          message: 'Meal was successfully updated.',
           status: :ok }
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
        message: 'Meal was successfully destroyed.',
         status: :found }
  end

  private
    def set_meal
      @meal = Meal.find(params[:id])
    end

    def meal_params
      params.require(:meal).permit(:number, :food_item_id)
    end
end
