json.id note.id
json.notebook_id note.notebook_id
json.title note.title
json.body note.body
json.updated_at note.updated_at
json.image_url asset_path(note.image.url(:original))

json.tags note.tags do |tag|
  json.partial! 'shared/tag', tag: tag
end
