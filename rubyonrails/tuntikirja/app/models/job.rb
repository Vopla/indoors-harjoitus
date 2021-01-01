class Job < ApplicationRecord
    has_many :notes

    validates :nimi, presence: true
end
