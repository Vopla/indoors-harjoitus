class AddJobIdToNotes < ActiveRecord::Migration[6.1]
  def change
    add_column :notes, :job_id, :integer
  end
end
