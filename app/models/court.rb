class Court < ApplicationRecord
    has_many :reservations, dependent: :destroy
    has_many :users, through: :reservations
  
    validates :name, presence: true
    validates :address, presence: true
  end
  