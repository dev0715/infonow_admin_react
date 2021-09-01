import {
  GET_STUDENTS_STATS,
  GET_STUDENTS_STATS_SUCCESS,
  GET_STUDENTS_STATS_FAILURE,

  GET_STUDENT_DETAILS,
  GET_STUDENT_DETAILS_SUCCESS,
  GET_STUDENT_DETAILS_FAILURE,

} from "./actionTypes"

export const getStudentsStats = () => {
  return {
    type: GET_STUDENTS_STATS,
  }
}

export const getStudentsStatsSuccess = (data) => {
  return {
    type: GET_STUDENTS_STATS_SUCCESS,
    payload: data,
  }
}

export const getStudentsStatsFailure = (error) => {
  return {
    type: GET_STUDENTS_STATS_FAILURE,
    payload: error,
  }
}

export const getStudentDetails = (id) => {
  return {
    type: GET_STUDENT_DETAILS,
    payload: id
  }
}

export const getStudentDetailsSuccess = (data) => {
  return {
    type: GET_STUDENT_DETAILS_SUCCESS,
    payload: data,
  }
}

export const getStudentDetailsFailure = (error) => {
  return {
    type: GET_STUDENT_DETAILS_FAILURE,
    payload: error,
  }
}