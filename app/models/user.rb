class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true
  validates :email, length: {minimum: 6}
  validate :password_digest_blank

  after_initialize :ensure_session_token

  has_many :notebooks,
  class_name: "Notebook",
  foreign_key: :user_id,
  primary_key: :id,
  dependent: :destroy

  has_many :notes,
  class_name: "Note",
  foreign_key: :user_id,
  primary_key: :id

  has_many :taggings, through: :notes

  has_many :tags,
  class_name: "Tag",
  foreign_key: :user_id,
  primary_key: :id,
  dependent: :destroy

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    unless user
      user = User.create!(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid],
            email: auth_hash[:info][:nickname], #bad solution
            password: SecureRandom::urlsafe_base64)
    end

    user
  end


  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def self.generate_password_digest(password)
    BCrypt::Password.create(password)
  end

  def self.find_by_credentials(email, password)
    # fail
    user = self.find_by(email: email[1])
    if !user || !user.is_password?(password[1])
      return false
    else
      return user
    end
  end

  attr_accessor :password

  def password_digest_blank
    if password_digest.blank?
      errors.add(:password, "can't be blank")
    end
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  def ensure_session_token
    unless self.session_token
      self.session_token = User.generate_session_token
    end
  end

  def password=(password)
    return if password.empty?
    self.password_digest = User.generate_password_digest(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end
