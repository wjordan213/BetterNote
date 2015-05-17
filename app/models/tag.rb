class Tag < ActiveRecord::Base
  validates :title, presence: true
  validates :title, :uniqueness => { scope: [:user_id] }

  has_many :taggings,
  class_name: "Tagging",
  foreign_key: :tag_id,
  primary_key: :id

  has_many :notes, through: :taggings

  belongs_to :user,
  class_name: "User",
  foreign_key: :user_id,
  primary_key: :id


  def save_with_tagging(note_id)
    save!
    Tagging.create({note_id: note_id, tag_id: self.id})
  end
end
