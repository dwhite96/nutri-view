FactoryBot.define do
  factory :food_item do
    data { json_data(filename: 'kale') }
  end
end
