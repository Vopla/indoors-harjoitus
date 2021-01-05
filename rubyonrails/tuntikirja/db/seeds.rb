# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

luokitukset = %w[rento kiireellinen]
kuvaukset = %w[Koodasin\ Rubylla\ pari\ tuntia Koodasin\ Rubylla\ monta\ tuntia Koodasin\ Rubylla\ muutaman\ tunnin]

for j in 1..3 do 
    jobs = Job.create!({
        nimi: "Projekti #{j}"
    })

    if jobs.persisted?

        for i in 1..5 do
            merkinnat = Note.create!({
                nimi: "Ruby-koodaus #{i}",
                kuvaus: kuvaukset[rand(kuvaukset.length)],
                tunnit: rand(1..5),
                luokitus: luokitukset[rand(luokitukset.length)],
                job_id: j
            })
        end
    end
end

