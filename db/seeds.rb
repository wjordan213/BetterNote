# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create!([
  {email: 'password', password_digest: User.generate_password_digest('password')},
  {email: 'wjordan213@gmail.com', password_digest: User.generate_password_digest('password')}])

notebooks = users[0].notebooks.create!([
  {title: 'mcmuffins'},
  {title: 'cheesy and delicious'},
  {title: 'scrumptiousness'},
  {title: 'soylent is disgustin'}
  ])

notes = notebooks[0].notes.create!([
  {title: 'are they good', body: 'yes they are delicious'},
  {title: 'mcdonalds is lame', body: 'peanut butter'},
  {title: 'yes world mang', body: 'yes and no and yes and no and yes and no'}
  ])
