json.array! @notes do |note|
  json.id note.id
  json.notebook_id note.notebook_id
  json.title note.title
end
