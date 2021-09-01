
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getStudentHistoryStats } from '@store/actions'
import HistoryList from './history-list'

import { Card, Row, Col, } from 'reactstrap'
import ProfileDetail from './profile-detail'

export const StudentHistory = (props) => {

    const [teachers, setTeachers] = useState([])
    const [user, setUser] = useState(null)

    const { studentHistory, studentHistoryLoading } = props
    let studentId = props.match.params.studentId;
    console.log("CHECK PARMAS HERE ==>", props.match.params);

    const fetchStudentHistory = () => {
        props.getStudentHistoryStats(studentId);
    }

    useEffect(() => {
        fetchStudentHistory();
    }, [])

    const studentsOfTeacher = () => {

        if (studentHistory && studentHistory.history && studentHistory.history.data.length > 0) {

            setUser(studentHistory.history.data[0].student.user)
            let studentData = []
            studentHistory.history.data.forEach(e => {
                studentData.push(e.teacher.user)
            })
            setTeachers(studentData)
        }

    }

    useEffect(() => {
        studentsOfTeacher();
    }, [studentHistory])

    return (

        <Row>
            <Col md="9">
                {
                    teachers &&
                    <HistoryList
                        users={teachers}
                        isTeacher={false}
                        fetchHistory={fetchStudentHistory}
                        isReloading={studentHistoryLoading}
                        onBack={props.onBack} />
                }
            </Col>
            <Col md="3">
                {
                    user &&
                    <ProfileDetail user={user} />
                }

            </Col>
        </Row>



    )
}

StudentHistory.propTypes = {
    onSelect: PropTypes.func,
    onBack: PropTypes.func
}


const mapStateToProps = (state) => {
    const { studentHistory, studentHistoryLoading, studentHistoryError } = state.History;
    return { studentHistory, studentHistoryLoading, studentHistoryError };
}

const mapDispatchToProps = {
    getStudentHistoryStats
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentHistory))
