import {
    GET_TEACHERS_STATS,
    GET_TEACHERS_STATS_SUCCESS,
    GET_TEACHERS_STATS_FAILURE,

    GET_TEACHER_DETAILS,
    GET_TEACHER_DETAILS_SUCCESS,
    GET_TEACHER_DETAILS_FAILURE,

    GET_ALL_TEACHERS,
    GET_ALL_TEACHERS_SUCCESS,
    GET_ALL_TEACHERS_FAILURE,

    GET_TEACHER_STUDENTS,
    GET_TEACHER_STUDENTS_SUCCESS,
    GET_TEACHER_STUDENTS_FAILURE,
} from "./actionTypes"

const initialState = {
    teachersStats: {},
    teachersError: null,
    teachersLoading: false,

    teacher: {},
    teacherLoading: false,
    teacherError: null,

    allTeachers: {},
    allTeachersLoading: false,
    allTeachersError: null,

    teacherStudents:[],
    teacherStudentsLoading:false,
    teacherStudentsError : null
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
            return { ...state, teacherLoading: true }

        case GET_TEACHER_DETAILS_SUCCESS:
            return { ...state, teacher: action.payload, teacherLoading: false }

        case GET_TEACHER_DETAILS_FAILURE:
            return { ...state, teacherError: action.payload, teacherLoading: false }

        case GET_ALL_TEACHERS:
            return { ...state, allTeachersLoading: true }

        case GET_ALL_TEACHERS_SUCCESS:
            return { ...state, allTeachers: action.payload, allTeachersLoading: false }

        case GET_ALL_TEACHERS_FAILURE:
            return { ...state,allTeachers:[], allTeachersError: action.payload, allTeachersLoading: false }

        case GET_TEACHER_STUDENTS:
            return { ...state, teacherStudentsLoading: true }

        case GET_TEACHER_STUDENTS_SUCCESS:
            return { ...state, teacherStudents: action.payload, teacherStudentsLoading: false }

        case GET_TEACHER_STUDENTS_FAILURE:
            return { ...state, teacherStudents:[], teacherStudentsError: action.payload, teacherStudentsLoading: false }

        default:
            return state
    }
}

export default teachersReducer
