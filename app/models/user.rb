class User < ApplicationRecord
    has_secure_password
    
    has_many :reservations
    has_many :courts, through: :reservations
end
