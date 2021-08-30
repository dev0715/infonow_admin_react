import {
  GET_TEACHERS,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAILURE,
  GET_TEACHER_DETAILS,
  GET_TEACHER_DETAILS_SUCCESS,
  GET_TEACHER_DETAILS_FAILURE,

} from "./actionTypes"

export const getTeachers = () => {
  return {
    type: GET_TEACHERS,
  }
}

export const getTeachersSuccess = (data) => {
  return {
    type: GET_TEACHERS_SUCCESS,
    payload: data,
  }
}

export const getTeachersFailure = (error) => {
  return {
    type: GET_TEACHERS_FAILURE,
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