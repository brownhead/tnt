require "json"

class UsersController < ApplicationController
    def get_prospects
        # TODO(johnsullivan): Don't just return everyone
        users = User.all
        render json: users.map { |user| user.as_public_json }
    end
end
