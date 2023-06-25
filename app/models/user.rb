class User < ApplicationRecord
    has_secure_password
  
    validates :password, presence: true
    validates :email, presence: true, uniqueness: true
    validates :name, length: { minimum: 2 }
    validates :address, presence: true
  
    has_many :reservations
    has_many :courts, through: :reservations
  end
  