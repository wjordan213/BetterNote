class Note < ActiveRecord::Base
  validates :notebook_id, :title, presence: true

  belongs_to :notebook,
  class_name: "Notebook",
  foreign_key: :notebook_id,
  primary_key: :id

end
