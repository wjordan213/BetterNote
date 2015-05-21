class Tagging < ActiveRecord::Base
  validates :tag_id, :note, presence: true

  belongs_to :note,
  class_name: "Note",
  foreign_key: :note_id,
  primary_key: :id,
  inverse_of: :taggings

  belongs_to :tag,
  class_name: "Tag",
  foreign_key: :tag_id,
  primary_key: :id

  def destroy
    tag = Tag.find(tag_id)
    tag.destroy if tag.taggings.empty?
    super
  end
end
