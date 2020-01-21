FactoryBot.define do
  factory :food_item do
    data {
      "foodClass": "Branded",
      "description": "ORGANIC PLANT PROTEIN PEANUT BUTTER DARK CHOCOLATE CHIP CHEWY BARS",
      "foodNutrients": [
        {
          "type": "FoodNutrient",
          "id": 7332240,
          "nutrient": {
            "id": 1003,
            "number": "203",
            "name": "Protein",
            "rank": 600,
            "unitName": "g"
          },
          "foodNutrientDerivation": {
            "id": 70,
            "code": "LCCS",
            "description": "Calculated from value per serving size measure",
            "foodNutrientSource": {
              "id": 9,
              "code": "12",
              "description": "Manufacturer's analytical; partial documentation"
            }
          },
          "amount": 24.00000000
        }
      ]
    }
  end
end
