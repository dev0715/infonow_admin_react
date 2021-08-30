import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { GET_TEACHERS, GET_TEACHER_DETAILS } from "./actionTypes"
import {
    getTeachersSuccess, getTeachersFailure,
    getTeacherDetailsSuccess, getTeacherDetailsFailure
} from "./actions"

//Include Both Helper File with needed methods
import { getLoggedInUser, getTeachers, getTeacher } from "../../../helpers/backend-helpers";


function* getTeachersHttp() {
    try {
        let user = getLoggedInUser()
        const response = yield call(getTeachers, user.userId);
        if (response) {
            yield put(getTeachersSuccess(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(getTeachersFailure(error.message ? error.message : error))
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
    yield takeEvery(GET_TEACHERS, getTeachersHttp)
    yield takeEvery(GET_TEACHER_DETAILS, getTeacherDetailsHttp)
}

export default teachersSaga
