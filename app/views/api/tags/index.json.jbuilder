json.array! @tags do |tag|
  json.partial! 'shared/tag', tag: tag
end
