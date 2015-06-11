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
  {title: 'a notebook'},
  {title: 'orgo'},
  {title: 'birds and bees'},
  {title: 'pokemon'}
  ])
  root = "#{Rails.root}/db/seeds"

notebooks[0].notes.create!({title: 'created first', body: 'yes they are delicious', user_id: 1})

notebooks[0].notes.create!({title: 'created second', body: 'peanut butter', user_id: 1})
notebooks[0].notes.create!({title: 'created third', body: 'yes and no and yes and no and yes and no', user_id: 1})
notebooks[1].notes.create!({title: '3d printing', body: "I hear it's what the cool kids are doing these days", user_id: 1})
notebooks[1].notes.create!({title: 'molecular orbitals', body: 'this has to do with benzene and electrons', user_id: 1})
notebooks[1].notes.create!({title: 'SN2 reactions', body: 'this has to do with my large problem set', user_id: 1})
notebooks[1].notes.create!({title: 'test on tuesday', body: 'tagging all related topics', user_id: 1})
notebooks[1].notes.create!({title: 'hw', body: 'this is all thats do next week', user_id: 1})
notebooks[2].notes.create!({title: 'meditative studying', body: 'this is related to stuff in other notebooks', user_id: 1, image: File.open("#{root}/cat.jpeg")})
notebooks[2].notes.create!({title: 'testing with a good attitude', body: 'this is about test taking', user_id: 1, image: File.open("#{root}/images.jpeg")})
Tag.create!([
  {title: 'tasty stuff', user_id: 1},
  {title: 'sandwiches', user_id: 1},
  {title: 'new things', user_id: 1},
  {title: 'benzene', user_id: 1},
  {title: 'electrons', user_id: 1},
  {title: 'problems', user_id: 1},
  {title: 'acids and bases', user_id: 1},
  {title: 'study habits', user_id: 1}
])

Tagging.create!([
  {note_id: 1, tag_id: 1},
  {note_id: 1, tag_id: 2},
  {note_id: 2, tag_id: 1},
  {note_id: 3, tag_id: 3},
  {note_id: 9, tag_id: 8},
  {note_id: 8, tag_id: 8},
  {note_id: 7, tag_id: 7},
  {note_id: 6, tag_id: 7},
  {note_id: 5, tag_id: 7}
  ])
