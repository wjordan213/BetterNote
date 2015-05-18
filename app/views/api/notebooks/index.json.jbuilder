json.array! @notebooks do |notebook|
  json.partial! 'shared/notebook', notebook: notebook
end
