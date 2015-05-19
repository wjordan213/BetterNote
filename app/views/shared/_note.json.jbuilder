json.id note.id
json.notebook_id note.notebook_id
json.title note.title
json.body note.body

puts note.tags

json.tags note.tags do |tag|
  json.partial! 'shared/tag', tag: tag
end
