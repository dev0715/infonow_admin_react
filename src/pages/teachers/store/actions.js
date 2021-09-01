import {
  GET_TEACHERS_STATS,
  GET_TEACHERS_STATS_SUCCESS,
  GET_TEACHERS_STATS_FAILURE,

  GET_TEACHER_DETAILS,
  GET_TEACHER_DETAILS_SUCCESS,
  GET_TEACHER_DETAILS_FAILURE,

} from "./actionTypes"

export const getTeachersStats = () => {
  return {
    type: GET_TEACHERS_STATS,
  }
}

export const getTeachersStatsSuccess = (data) => {
  return {
    type: GET_TEACHERS_STATS_SUCCESS,
    payload: data,
  }
}

export const getTeachersStatsFailure = (error) => {
  return {
    type: GET_TEACHERS_STATS_FAILURE,
    payload: error,
  }
}

export const getTeacherDetails = (id) => {
  return {
    type: GET_TEACHER_DETAILS,
    payload: id
  }
}

export const getTeacherDetailsSuccess = (data) => {
  return {
    type: GET_TEACHER_DETAILS_SUCCESS,
    payload: data,
  }
}

export const getTeacherDetailsFailure = (error) => {
  return {
    type: GET_TEACHER_DETAILS_FAILURE,
    payload: error,
  }
}