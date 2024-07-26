# lib/tasks/import_courts.rake

namespace :import do
    desc 'Import courts from JSON file'
    task courts: :environment do
      file_path = Rails.root.join('db', 'formatted_courts.json')
      file = File.read(file_path)
      courts = JSON.parse(file)
  
      courts.each do |court|
        Court.create!(
          name: court['title'],
          address: court['address'],
          price: court['facility_type'],
          created_at: Time.parse(court['created_at']),
          updated_at: Time.parse(court['updated_at'])
        )
      end
  
      puts 'Courts have been successfully imported.'
    end
  end
  