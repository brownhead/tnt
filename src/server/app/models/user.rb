class User < ActiveRecord::Base
	def as_public_json
        as_json only: [:id, :name]
    end
end
