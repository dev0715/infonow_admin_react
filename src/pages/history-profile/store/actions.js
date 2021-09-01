import {
    GET_TEACHER_HISTORY_STATS,
    GET_TEACHER_HISTORY_STATS_SUCCESS,
    GET_TEACHER_HISTORY_STATS_FAILURE,

    GET_STUDENT_HISTORY_STATS,
    GET_STUDENT_HISTORY_STATS_SUCCESS,
    GET_STUDENT_HISTORY_STATS_FAILURE,
} from './actionTypes'


export const getTeacherHistoryStats = (teacherId) => {
    return {
        type: GET_TEACHER_HISTORY_STATS,
        payload: { teacherId }
    }
}

export const getTeacherHistoryStatsSuccess = (data) => {
    return {
        type: GET_TEACHER_HISTORY_STATS_SUCCESS,
        payload: data
    }
}

export const getTeacherHistoryStatsFailure = (error) => {
    return {
        type: GET_TEACHER_HISTORY_STATS_FAILURE,
        payload: error
    }
}

export const getStudentHistoryStats = (studentId) => {
    return {
        type: GET_STUDENT_HISTORY_STATS,
        payload: { studentId }
    }
}

export const getStudentHistoryStatsSuccess = (data) => {
    return {
        type: GET_STUDENT_HISTORY_STATS_SUCCESS,
        payload: data
    }
}

export const getStudentHistoryStatsFailure = (error) => {
    return {
        type: GET_STUDENT_HISTORY_STATS_FAILURE,
        payload: error
    }
}