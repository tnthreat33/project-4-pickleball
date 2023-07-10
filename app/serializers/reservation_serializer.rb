class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :court_id, :date, :start_time, :end_time, :formatted_time, :court_name

  belongs_to :user

  def formatted_time
    object.start_time.strftime('%l:%M%P') + '-' + object.end_time.strftime('%l:%M%P')
  end
end

