json.partial! 'shared/notebook', notebook: @notebook

json.notes @notebook.notes do |note|
  json.partial! 'shared/note', note: note
end
