import {
    GET_TEACHERS_STATS,
    GET_TEACHERS_STATS_SUCCESS,
    GET_TEACHERS_STATS_FAILURE,

    GET_TEACHER_DETAILS,
    GET_TEACHER_DETAILS_SUCCESS,
    GET_TEACHER_DETAILS_FAILURE,
} from "./actionTypes"

const initialState = {
    teachersStats: {},
    teachersError: null,
    teachersLoading: false,

    teacher: {},
    teacherLoading: false,
    teacherError: null,
}

const teachersReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TEACHERS_STATS:
            return { ...state, teachersLoading: true }

        case GET_TEACHERS_STATS_SUCCESS:
            return { ...state, teachersStats: action.payload, teachersLoading: false }

        case GET_TEACHERS_STATS_FAILURE:
            return { ...state, teachersError: action.payload, teachersLoading: false }

        case GET_TEACHER_DETAILS:
            return { ...state, teacherError: null, teacherLoading: true }

        case GET_TEACHER_DETAILS_SUCCESS:
            return { ...state, teacher: action.payload, teacherError: null, teacherLoading: false }

        case GET_TEACHER_DETAILS_FAILURE:
            return { ...state, teachers: {}, teacherError: action.payload, teacherLoading: false }

        default:
            return state
    }
}

export default teachersReducer
