import {
  GET_STUDENTS,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAILURE,
  GET_STUDENT_DETAILS,
  GET_STUDENT_DETAILS_SUCCESS,
  GET_STUDENT_DETAILS_FAILURE,

} from "./actionTypes"

export const getStudents = () => {
  return {
    type: GET_STUDENTS,
  }
}

export const getStudentsSuccess = (data) => {
  return {
    type: GET_STUDENTS_SUCCESS,
    payload: data,
  }
}

export const getStudentsFailure = (error) => {
  return {
    type: GET_STUDENTS_FAILURE,
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