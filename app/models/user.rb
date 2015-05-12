class User < ActiveRecord::Base
    validates :email, :session_token,:password_digest, presence: true
    validates :email, uniqueness: true
end
