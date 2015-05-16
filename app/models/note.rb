class Note < ActiveRecord::Base
  validates :notebook_id, :title, presence: true

  has_many :taggings,
  class_name: "Tagging",
  foreign_key: :note_id,
  primary_key: :id

  belongs_to :notebook,
  class_name: "Notebook",
  foreign_key: :notebook_id,
  primary_key: :id

end
