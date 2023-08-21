class TransactionsController < ApplicationController
  before_action :transactions

  def index
    render json: @transactions
  end

  private
  def transactions
    @transactions = Transaction.all
                                .where(purchased_on: start_time..end_time)
                                .sort_by(&:purchased_on)
                                .group_by(&:purchased_on)
                                .map{ |g, t| [g, t.sum(&:amount)] }
  end

  def start_time
    params[:start_time] ? Time.at(params[:start_time].to_i / 1000).beginning_of_day : Time.current - 1
  end

  def end_time
    params[:end_time] ? Time.at(params[:end_time].to_i / 1000).end_of_day : Time.current
  end
end
