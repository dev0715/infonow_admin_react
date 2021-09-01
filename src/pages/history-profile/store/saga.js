import { call, put, takeEvery } from "redux-saga/effects"

import {
    GET_TEACHER_HISTORY_STATS,
    GET_STUDENT_HISTORY_STATS
  } from "./actionTypes"


  import {
  getTeacherHistoryStatsSuccess,
  getTeacherHistoryStatsFailure,
  getStudentHistoryStatsSuccess,
  getStudentHistoryStatsFailure,
  } from "./actions"

  import { getTeacherHistoryStats , getStudentHistoryStats} from '../../../helpers/backend-helpers'

function* getTeacherHistoryStatsHttp({payload:data}) {
    try {
      const response = yield call(getTeacherHistoryStats , data.teacherId);
      if (response) {
        yield put(getTeacherHistoryStatsSuccess(response))
        return;
      }
      throw "Unknown response received from Server";
  
    } catch (error) {
      yield put(getTeacherHistoryStatsFailure(error))
    }
  }

  function* getStudentHistoryStatsHttp({payload:data}) {
    try {
      const response = yield call(getStudentHistoryStats , data.studentId);
      if (response) {
        yield put(getStudentHistoryStatsSuccess(response))
        return;
      }
      throw "Unknown response received from Server";
  
    } catch (error) {
      yield put(getStudentHistoryStatsFailure(error))
    }
  }



function* HistorySaga() {
    yield takeEvery(GET_TEACHER_HISTORY_STATS, getTeacherHistoryStatsHttp)
    yield takeEvery(GET_STUDENT_HISTORY_STATS, getStudentHistoryStatsHttp)
  }
  
  export default HistorySaga
  