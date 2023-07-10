class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :court

  validate :date_must_be_after_today
  validate :end_time_must_be_after_start_time

  def court_name
    self.court.name 
  end

  private

  def date_must_be_after_today
    errors.add(:date, "must be after today's date") if date.present? && date <= Date.today
  end

  def end_time_must_be_after_start_time
    return unless start_time.present? && end_time.present?

    errors.add(:end_time, "must be after the start time") if end_time <= start_time
  end

end
