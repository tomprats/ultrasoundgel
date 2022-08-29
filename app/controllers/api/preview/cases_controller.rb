class Api::Preview::CasesController < Api::Preview::ApplicationController
  include CaseConcerns

  def index
    records = Case.descending

    render json: {cases: cases_as_json(records)}
  end

  def show
    record = Case.find_by!(uid: params[:uid])

    render json: {case: case_as_json(record)}
  end
end
