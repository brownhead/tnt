# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

john = User.create({ name: "John", email: "johnsullivan.pem@gmail.com" })
michael = User.create({ name: "Michael", email: "mhuston@gmail.com" })
Match.create({ source_id: john.id, target_id: michael.id, requited: false })

jane = User.create({ name: "Jane", email: "jane@gmail.com" })
lucy = User.create({ name: "Lucy", email: "lucy@gmail.com" })
Match.create({ source_id: jane.id, target_id: lucy.id, requited: false })
Match.create({ source_id: lucy.id, target_id: michael.id, requited: true })
