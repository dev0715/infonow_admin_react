import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { GET_TEACHERS_STATS, GET_TEACHER_DETAILS } from "./actionTypes"
import {
    getTeachersStatsSuccess, getTeachersStatsFailure,
    getTeacherDetailsSuccess, getTeacherDetailsFailure
} from "./actions"

//Include Both Helper File with needed methods
import { getTeachersStats, getTeacher } from "../../../helpers/backend-helpers";


function* getTeachersStatsHttp() {
    try {
        const response = yield call(getTeachersStats);
        if (response) {
            yield put(getTeachersStatsSuccess(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(getTeachersStatsFailure(error.message ? error.message : error))
    }
}

function* getTeacherDetailsHttp({ payload }) {
    try {
        const response = yield call(getTeacher, payload);
        if (response) {
            yield put(getTeacherDetailsSuccess(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(getTeacherDetailsFailure(error.message ? error.message : error))
    }
}


function* teachersSaga() {
    yield takeEvery(GET_TEACHERS_STATS, getTeachersStatsHttp)
    yield takeEvery(GET_TEACHER_DETAILS, getTeacherDetailsHttp)
}

export default teachersSaga
