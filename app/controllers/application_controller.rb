class ApplicationController < ActionController::Base
  include ReactOnRails::Controller

  respond_to :html, :json
end
