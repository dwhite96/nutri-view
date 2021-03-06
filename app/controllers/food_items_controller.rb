class FoodItemsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_food_item, only: [:show, :edit, :update, :destroy]

  wrap_parameters :food_item, include: [:data]

  # GET /food_items
  # GET /food_items.json
  def index
    @food_items = FoodItem.all

    respond_to do |format|
      format.html
      format.json { render json: @food_items, status: :ok }
    end

    redux_store("configureStore", props: { foodItems: @food_items })
  end

  # GET /food_items/search_data
  # GET /food_items/search_data.json
  def search_data
    @food_items = FoodItem.search_data(params[:search])

    render json: { food_items: @food_items }
  end

  # GET /food_items/1
  # GET /food_items/1.json
  def show
  end

  # GET /food_items/new
  def new
    @food_item = FoodItem.new
  end

  # GET /food_items/1/edit
  def edit
  end

  # POST /food_items
  # POST /food_items.json
  def create
    @food_item = FoodItem.new(food_item_params)

    if @food_item.save
      render json: { message: 'Food item was successfully saved.' }, status: :created
    else
      render json: @food_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /food_items/1
  # PATCH/PUT /food_items/1.json
  def update
    respond_to do |format|
      if @food_item.update(food_item_params)
        format.html { redirect_to @food_item, notice: 'Food item was successfully updated.' }
        format.json { render :show, status: :ok, location: @food_item }
      else
        format.html { render :edit }
        format.json { render json: @food_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /food_items/1
  # DELETE /food_items/1.json
  def destroy
    @food_item.destroy

    respond_to do |format|
      format.html { redirect_to food_items_url, notice: 'Food item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food_item
      @food_item = FoodItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def food_item_params
      params.require(:food_item).permit!
    end
end
