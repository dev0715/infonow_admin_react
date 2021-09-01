import {
    GET_STUDENTS_STATS,
    GET_STUDENTS_STATS_SUCCESS,
    GET_STUDENTS_STATS_FAILURE,

    GET_STUDENT_DETAILS,
    GET_STUDENT_DETAILS_SUCCESS,
    GET_STUDENT_DETAILS_FAILURE,
} from "./actionTypes"

const initialState = {
    studentStats: {},
    studentStatsError: null,
    studentStatsLoading: false,

    student: {},
    studentLoading: false,
    studentError: null,
}

const studentsReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_STUDENTS_STATS:
            return { ...state,  studentStatsLoading: true }

        case GET_STUDENTS_STATS_SUCCESS:
            return { ...state, studentStats: action.payload,  studentStatsLoading: false }

        case GET_STUDENTS_STATS_FAILURE:
            return { ...state, studentStatsError: action.payload, studentStatsLoading: false }

        case GET_STUDENT_DETAILS:
            return { ...state, studentError: null, studentLoading: true }

        case GET_STUDENT_DETAILS_SUCCESS:
            return { ...state, student: action.payload, studentError: null, studentLoading: false }

        case GET_STUDENT_DETAILS_FAILURE:
            return { ...state, students: {}, studentError: action.payload, studentLoading: false }

        default:
            return state
    }
}

export default studentsReducer
