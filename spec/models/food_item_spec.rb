require 'rails_helper'

RSpec.describe FoodItem, type: :model do
  let(:food_item) do
    food_item = build(:food_item, data: file_fixture('kale.json').read)
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of :data }

    it 'returns error with invalid json data' do
      food_item_with_invalid_json = FoodItem.create(data: '{foo: "bar"}')
      expect(food_item_with_invalid_json.errors.messages[:base]).to eq ['Not in JSON format']
    end

    it 'includes valid json data' do
      expect(food_item).to be_valid
    end
  end
end
