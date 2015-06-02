json.array! @search_results.map(&:searchable) do |note|
  json.partial! 'shared/note', note: note
end
