class User < ApplicationRecord
    has_secure_password
    
    validates :password, presence: true
    
    has_many :reservations
    has_many :courts, through: :reservations
end
