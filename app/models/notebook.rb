class Notebook < ActiveRecord::Base
  validates :user_id, :title, presence: true

  belongs_to(:user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
    )

  has_many :notes,
  class_name: "Note",
  foreign_key: :notebook_id,
  primary_key: :id,
  dependent: :destroy

    def is_owner?(user)
      self.user_id == user.id
    end
end
