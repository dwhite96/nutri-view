require_relative "20200811034820_add_jti_to_users"

class RevertAddJtiToUsers < ActiveRecord::Migration[6.0]
  def change
    revert AddJtiToUsers
  end
end
