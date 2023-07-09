class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest

  has_many :reservations
  #has_many :courts, through: :reservations
end