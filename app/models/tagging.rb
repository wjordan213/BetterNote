class Tagging < ActiveRecord::Base
  validates :tag_id, :note_id, presence: true
  validates :tag_id, :uniqueness => { scope: [:note_id] }

  belongs_to :note,
  class_name: "Note",
  foreign_key: :note_id,
  primary_key: :id

  belongs_to :tag,
  class_name: "Tag",
  foreign_key: :tag_id,
  primary_key: :id
end
