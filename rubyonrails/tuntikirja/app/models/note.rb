class Note < ApplicationRecord
    validates :nimi, presence: true
    validates :kuvaus, presence: true
    validates :tunnit, presence: true
    validate :luokitus
    validates :job_id, presence: true
    
    belongs_to :job
    
end
