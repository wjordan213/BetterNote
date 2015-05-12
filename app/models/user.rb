class User < ActiveRecord::Base
  validates :email,:password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true
  validates :email, length: {minimum: 6}

  before_validation :ensure_session_token

  def self.generate_session_token
    SecureRandom::urlsafe_base64
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

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  def ensure_session_token
    puts 'hello'
    unless self.session_token
      self.session_token = User.generate_session_token
    end
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end
