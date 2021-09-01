
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import { useEffect ,useState} from 'react'

import { getTeacherHistoryStats } from '@store/actions'
import HistoryList from './history-list'

import {Card , Row , Col, } from 'reactstrap'
import ProfileDetail from './profile-detail'

export const TeacherHistory = (props) => {

     const [students, setStudents] = useState([])
     const [user, setUser] = useState(null)
    
    const {  teacherHistory , teacherHistoryLoading } = props
    let teacherId = props.match.params.teacherId;
    const fetchTeacherHistory = () => {
        props.getTeacherHistoryStats(teacherId);
    }
    
    useEffect(() => {
        fetchTeacherHistory();
    }, [])

    const studentsOfTeacher = () =>{
       
        if (teacherHistory &&  teacherHistory.history && teacherHistory.history.data.length > 0){
         
            setUser(teacherHistory.history.data[0].teacher.user)
            let studentData= []
            teacherHistory.history.data.forEach( e => {
                studentData.push(e.student.user)
            })
            setStudents(studentData)
        }
              
    }

    useEffect(() => {
        studentsOfTeacher();
    }, [teacherHistory])

    return (
        
            <Row>
                <Col md="9">
                {
                    students &&
                    <HistoryList
                    users={students}
                    isTeacher={true}
                    fetchHistory={fetchTeacherHistory}
                    isReloading={teacherHistoryLoading}
                    onBack={props.onBack} />
                 }
                 </Col>
                 <Col md ="3">
                     {
                         user &&
                         <ProfileDetail user={user}  />
                     }
                    
                </Col>
            </Row>
          
           
       
    )
}

TeacherHistory.propTypes = {
    onSelect: PropTypes.func,
    onBack: PropTypes.func
}


const mapStateToProps = (state) => {
    const { teacherHistory, teacherHistoryLoading, teacherHistoryError } = state.History;
    return { teacherHistory, teacherHistoryLoading, teacherHistoryError };
}

const mapDispatchToProps = {
    getTeacherHistoryStats
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherHistory))
