class Match < ActiveRecord::Base
	def get_other(user_id)
		source_id == user_id ? target_id : source_id
	end

	def self.get_requited_matches_for(user_id)
		Match.where("source_id = :id OR target_id = :id", {id: user_id})
			 .where(requited: true)
	end
end
