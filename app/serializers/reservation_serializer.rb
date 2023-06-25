class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :date, :start_time, :end_time, :court_id, :user_id
end
