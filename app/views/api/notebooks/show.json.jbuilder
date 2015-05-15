json.id @notebook.id
json.title @notebook.title

json.notes @notebook.notes do |note|
  json.id note.id
  json.title note.title
end
