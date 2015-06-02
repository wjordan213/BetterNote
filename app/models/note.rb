class Note < ActiveRecord::Base
  include PgSearch
  
  has_attached_file :image, :styles => { :medium => "300x300" }
  validates :notebook_id, :title, presence: true
  # validates :image, :attachment_presence => true
  validates_attachment :image,
   :content_type => { :content_type => ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'] }

  multisearchable against: [:title, :body]

  has_many :taggings,
  class_name: "Tagging",
  foreign_key: :note_id,
  primary_key: :id,
  inverse_of: :note,
  dependent: :destroy

  has_many :tags, through: :taggings

  belongs_to :notebook,
  class_name: "Notebook",
  foreign_key: :notebook_id,
  primary_key: :id

end
