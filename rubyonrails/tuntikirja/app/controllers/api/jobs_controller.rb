module Api
    class JobsController < ApplicationController
        def index
            jobs = Job.order('created_at DESC');
            render json: {status: 'SUCCESS', message:'Projektit haettu', data:jobs},status: :ok       
        end

        def show
            job = Job.find(params[:id])
            render json: {status: 'SUCCESS', message:'Projekti haettu', data:job},status: :ok
        end

        def create
            job = Job.new(job_permitted)
            if job.save
                render json: {status: 'SUCCESS', message:'Projekti tallennettu', data:job},status: :ok
            else
                render json: {status: 'ERROR', message:'Projekti ei tallentunut', data:job.errors},status: :unprocessable_entity
            end
        end
                
        def destroy  
            job = Job.find(params[:id])
            job.destroy
            if job.destroy
                render json: {status: 'SUCCESS', message:'Projekti tuhottu', data:job},status: :ok
            else
                render json: {status: 'ERROR', message:'Mitään ei tuhottu', data:job.errors},status: :unprocessable_entity
            end
        end

        def update
            job = Job.find(params[:id])
            if job.update_attributes(job_permitted)
                render json: {status: 'SUCCESS', message:'Projekti muutettu', data:job},status: :ok
            else
                render json: {status: 'ERROR', message:'Projektia ei voitu muuttaa', data:job.errors},status: :unprocessable_entity
            end
    end
    
        private

        def job_permitted
            params.permit(:nimi)
        end
    end
end
