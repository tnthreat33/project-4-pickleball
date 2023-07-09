class CourtSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :price 

  has_many :reservations 
  has_many :users, through: :reservations
end
