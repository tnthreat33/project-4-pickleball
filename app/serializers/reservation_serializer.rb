class ReservationSerializer < ActiveModel::Serializer

  attributes :id, :user_id, :court_id, :date, :start_time, :end_time, :formatted_time

  def formatted_time
    object.start_time.strftime('%l%P') + '-' + object.end_time.strftime('%l%P')
  end
end

