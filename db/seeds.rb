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
  {title: 'first notebook'},
  {title: 'second notebook'},
  {title: 'third notebook'},
  {title: 'fourth notebook'}
  ])


notes = notebooks[0].notes.create!({title: 'created first', body: 'yes they are delicious'})

notes = notebooks[0].notes.create!({title: 'created second', body: 'peanut butter'})
notes = notebooks[0].notes.create!({title: 'created third', body: 'yes and no and yes and no and yes and no'})

Tag.create!([
  {title: 'tasty stuff', user_id: 1},
  {title: 'sandwiches', user_id: 1},
  {title: 'new things', user_id: 1}
])

Tagging.create!([
  {note_id: 1, tag_id: 1},
  {note_id: 1, tag_id: 2},
  {note_id: 2, tag_id: 1},
  {note_id: 3, tag_id: 2}
  ])
