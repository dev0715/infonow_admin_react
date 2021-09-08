

import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Card } from 'reactstrap';
import UILoader from '../../@core/components/ui-loader';
import { getAllTeachers, postAssignTeacher, getTeacherStudents, unassignTeacher } from '@store/actions'
import UsersList from './users-list'
import UserInfo from './user-info'
import { errorAlertDialog, successAlertDialog } from '../../helpers/HelperFunctions';
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const assignTeacher = (props) => {


    const { user, isTeacher } = props.history.location.state

    const [selectedUser, setSelectedUser] = useState(user)
    const { allTeachers, allTeachersError, allTeachersLoading,
        teacherStudents, teacherStudentsError, teacherStudentsLoading,
        unassignTeacher, unassignTeacherSuccess, unassignTeacherError, unassignTeacherLoading,
        assignTeacher, assignTeacherSuccess, assignTeacherError, assignTeacherLoading, } = props

    const [listData, setlistData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(unassignTeacherLoading)
    }, [props.unassignTeacherLoading])

    useEffect(() => {
        setIsLoading(assignTeacherLoading)
    }, [props.assignTeacherLoading])

    useEffect(() => {
        if(props.assignTeacherSuccess)
            successAlertDialog('Teacher assigned successfully')
    }, [props.assignTeacherSuccess])

    useEffect(() => {
        if(props.assignTeacheError)
            errorAlertDialog(assignTeacherError)
    }, [props.assignTeacherError])

    useEffect(() => {
        if(props.unassignTeacherSuccess)
            successAlertDialog('Teacher unassigned successfully')
    }, [props.unassignTeacherSuccess])

    useEffect(() => {
        if(props.unassignTeacherError)
            errorAlertDialog(unassignTeacherError)
    }, [props.unassignTeacherError])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        if (isTeacher) {
            props.getAllTeachers()
        } else {
            props.getTeacherStudents(user.userId)
        }
    }

    const onAssignTeacher = (teacher) => {
        let data = {
            teacherId: teacher.userId,
            studentId: user.userId
        }
        props.postAssignTeacher(data)
    }

    const onUnassignTeacher = (student) => {
        let data = {
            studentId: student.userId
        }
        props.unassignTeacher(data)
    }

    useEffect(() => {
        setlistData([])
        console.log("CHECK STUDENTS ==>" , teacherStudents)
        if (allTeachers.length > 0) setlistData(allTeachers)
        if (teacherStudents.length > 0) setlistData(teacherStudents)
    }, [allTeachers, teacherStudents])


    return (
        <>
            <UILoader blocking={isLoading}>
                {
                    selectedUser &&
                    <Card>
                        <UserInfo user={selectedUser} />
                    </Card>
                }

                {
                    listData &&
                    listData.length > 0 &&
                    <Card>
                        <UsersList
                            listData={listData}
                            isTeacher={isTeacher}
                            fetchListData={fetchData}
                            isReloading={isTeacher ? allTeachersLoading : teacherStudentsLoading}
                            onAssignTeacher={onAssignTeacher}
                            onUnassignTeacher={onUnassignTeacher} />
                    </Card>
                }
            </UILoader>
        </>
    )
}


const mapStateToProps = (state) => {
    const {
        allTeachers,
        allTeachersError,
        allTeachersLoading,

        teacherStudents,
        teacherStudentsLoading,
        teacherStudentsError,

    } = state.Teachers

    const {
        assignTeacher,
        assignTeacherSuccess,
        assignTeacherError,
        assignTeacherLoading,

        unassignTeacher,
        unassignTeacherSuccess,
        unassignTeacherError,
        unassignTeacherLoading,

    } = state.Assign

    return {
        allTeachers,
        allTeachersError,
        allTeachersLoading,

        teacherStudents,
        teacherStudentsLoading,
        teacherStudentsError,

        assignTeacher,
        assignTeacherSuccess,
        assignTeacherError,
        assignTeacherLoading,

        unassignTeacher,
        unassignTeacherSuccess,
        unassignTeacherError,
        unassignTeacherLoading,

    }




}

const mapDispatchToProps = {
    getAllTeachers,
    postAssignTeacher,
    getTeacherStudents,
    unassignTeacher
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(assignTeacher))