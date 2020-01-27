require 'json'

class FoodItem < ApplicationRecord
  validates :data, presence: true

  validate :data_in_json_format

  protected

    def data_in_json_format
      errors[:base] << "Not in JSON format" unless is_json?(data)
    end

    def is_json?(data)
      begin
        !!JSON.parse(data)
      rescue
        false
      end
    end
end
