# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Clear existing data


# Create users
10.times do |i|
    User.create(
      name: "User #{i+1}",
      email: "user#{i+1}@example.com",
      password_digest: 'password123'
    )
  end
  
  # Create courts
  10.times do |i|
    Court.create(
      name: "Court #{i+1}",
      address: "Address #{i+1}"
    )
  end
  
  # Create reservations
  25.times do
      user = User.order('RANDOM()').first
      court = Court.order('RANDOM()').first
      date = Faker::Date.between(from: Date.today, to: 1.month.from_now)
      start_time = Faker::Time.between_dates(from: date, to: date, period: :morning)
      end_time = start_time + 1.hour
    
      Reservation.create(
        user: user,
        court: court,
        date: date,
        start_time: start_time,
        end_time: end_time
      )
    end