json.partial! 'shared/tag', tag: @tag
json.notes @notes do |note|
  json.partial! 'shared/note', note: note
end
