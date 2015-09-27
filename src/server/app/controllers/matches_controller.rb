class MatchesController < ApplicationController
	def get_all
		user_id = 6

		# TODO(johnsullivan): Join this into a single query

		# Get all requited matches for the user
		matches = Match.get_requited_matches_for(user_id)

		# Get all of the matched users
		matched_user_ids = matches.map { |match| match.get_other(user_id) }
		matched_users = User.find(matched_user_ids)
							.map { |user| user.as_public_json}

		render json: matched_users
	end

	def make
		ActiveRecord::Base.transaction do
		  david.withdrawal(100)
		  mary.deposit(100)
		end

		render json: {hello: "world"}
	end
end
