class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :nimi
      t.text :kuvaus
      t.integer :tunnit
      t.string :luokitus
      t.belongs_to :job foreign_key: true

      t.timestamps
    end
  end
end
