require 'json'
require 'time'

# Load the JSON data
file = File.read('courts.json')
data = JSON.parse(file)

# Create an array to store the formatted data
formatted_data = []

data['result']['data']['courts'].each do |court|
  formatted_court = {
    'name' => court['title'],
    'address' => court['address'],
    'facility_type' => court['facility_type'],
    'created_at' => court['created_at'],
    'updated_at' => court['updated_at']
  }
  formatted_data << formatted_court
end

# Save the formatted data to a new JSON file
File.open('db/formatted_courts.json', 'w') do |f|
  f.write(JSON.pretty_generate(formatted_data))
end

puts 'Data transformation complete. The formatted data has been saved to db/formatted_courts.json.'
