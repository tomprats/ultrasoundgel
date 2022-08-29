class Api::CasesController < Api::ApplicationController
  include CaseConcerns

  before_action :set_record, except: :index

  def index
    records = Case.all

    render json: {cases: cases_as_json(records)}
  end

  def show
    render json: {case: case_as_json(@record)}
  end

  def subscribe
    render json: {success: false, message: "No one's home"} if current_user.blank?

    current_user.comment_notifications.find_or_create_by(comment_notificationable: @record)

    render json: {success: true, message: "Subscribed"}
  end

  def unsubscribe
    render json: {success: false, message: "No one's home"} if current_user.blank?

    current_user.comment_notifications.find_by(comment_notificationable: @record).try(:destroy)

    render json: {success: true, message: "Unsubscribed"}
  end

  private

  def set_record
    @record = Case.find_by!(uid: params[:uid])
  end
end
