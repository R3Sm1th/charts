# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

50_000.times do
  amount = rand(10.00..1000.00).round(2)
  purchased_on = rand((Time.now - 5.year)..Time.now)
  Transaction.create!( amount: amount, purchased_on: purchased_on )
end
