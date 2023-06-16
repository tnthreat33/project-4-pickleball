class CreateCourts < ActiveRecord::Migration[6.1]
  def change
    create_table :courts do |t|
      t.string :name
      t.string :address
      t.integer :price

      t.timestamps
    end
  end
end
