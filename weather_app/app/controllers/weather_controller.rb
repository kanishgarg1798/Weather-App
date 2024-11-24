class WeatherController < ApplicationController
    require 'httparty'

    def forecast
        city = params[:city]
        country = params[:country]

        return render json: { error: 'Invalid input' }, status: :bad_request unless city && country

        api_key = ENV['WEATHER_API_KEY']
        url = "https://api.weatherbit.io/v2.0/forecast/daily?city=#{city}&country=#{country}&key=#{api_key}"

        response = HTTParty.get(url)
        if response.success?
            data = response.parsed_response['data']
            avg_temp = (data[0...10].map { |d| d['temp'] }.sum / 10.0).round(2)
            weekly_forecast = data[0...7].map { |d| { day: Date.parse(d['datetime']).strftime('%A'), temp: d['temp'] } }

            render json: { avg_temp: avg_temp, weekly_forecast: weekly_forecast }
        else
            render json: { error:  response.parsed_response['error'] }, status: :bad_request
        end
    end
end