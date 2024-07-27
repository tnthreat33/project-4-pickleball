# lib/tasks/import_courts.rake

namespace :import do
    desc 'Import courts from JSON file'
    task courts: :environment do
      file_path = Rails.root.join('app','courts.json')
      file = File.read(file_path)
      courts = JSON.parse(file)
  
      courts.each do |court|
        Court.create!(
          name: court['title'] || 'Unknown Title', 
          address: court['address'] || 'Unknown Address',
          price: court['facility_type'] || 'Unknown Price',
          created_at: court['created_at'] ? Time.parse(court['created_at']) : Time.now,
          updated_at: court['updated_at'] ? Time.parse(court['updated_at']) : Time.now
      
        )
      end
  
      puts 'Courts have been successfully imported.'
    end
  end
  