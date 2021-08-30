import {
    GET_STUDENTS,
    GET_STUDENTS_SUCCESS,
    GET_STUDENTS_FAILURE,
    GET_STUDENT_DETAILS,
    GET_STUDENT_DETAILS_SUCCESS,
    GET_STUDENT_DETAILS_FAILURE,
} from "./actionTypes"

const initialState = {
    students: [],
    studentsError: null,
    studentsLoading: false,
    student: {},
    studentLoading: false,
    studentError: null,
}

const studentsReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_STUDENTS:
            return { ...state, studentsError: null, studentsLoading: true }

        case GET_STUDENTS_SUCCESS:
            return { ...state, students: action.payload, studentsError: null, studentsLoading: false }

        case GET_STUDENTS_FAILURE:
            return { ...state, students: [], studentsError: action.payload, studentsLoading: false }

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
