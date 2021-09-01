import {
  GET_TEACHER_HISTORY_STATS,
  GET_TEACHER_HISTORY_STATS_SUCCESS,
  GET_TEACHER_HISTORY_STATS_FAILURE,

  GET_STUDENT_HISTORY_STATS,
  GET_STUDENT_HISTORY_STATS_SUCCESS,
  GET_STUDENT_HISTORY_STATS_FAILURE

} from './actionTypes'


const initialState = {
  teacherHistory: {},
  teacherHistoryError: null,
  teacherHistoryLoading: false,

  studentHistory: {},
  studentHistoryError: null,
  studentHistoryLoading: false,

}


const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHER_HISTORY_STATS:
      return { ...state, teacherHistoryLoading: true }
    case GET_TEACHER_HISTORY_STATS_SUCCESS:
      return { ...state, teacherHistoryLoading: false, teacherHistory: action.payload }
    case GET_TEACHER_HISTORY_STATS_FAILURE:
      return { ...state, teacherHistoryLoading: false, teacherHistoryError: action.payload }
    case GET_STUDENT_HISTORY_STATS:
      return { ...state, studentHistoryLoading: true }
    case GET_STUDENT_HISTORY_STATS_SUCCESS:
      return { ...state, studentHistoryLoading: false, studentHistory: action.payload }
    case GET_STUDENT_HISTORY_STATS_FAILURE:
      return { ...state, studentHistoryLoading: false, studentHistoryError: action.payload }
    default:
      return state
  }
}

export default historyReducer