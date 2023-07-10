class CourtSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :price 

  has_many :reservations 
  
end
