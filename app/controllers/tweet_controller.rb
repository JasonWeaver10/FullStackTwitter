class TweetController < ApplicationController
  before_action :current_user, only: [ :create]

  def index
    @tweets = Tweet.all()
    
  end

  def create
    @tweet = Tweet.create(tweet_Params)
  end

  def show
    @tweet = Tweet.find(params[:id])
  end

  private 

  def tweet_Params
    params.require(:message)
  end 
   
end
