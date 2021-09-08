import React, { useEffect, useState } from 'react';
// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import {
    Card, CardBody, Row, Col, Button,
} from 'reactstrap'


import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

// ** Store & Actions
import { connect } from 'react-redux'

import { withRouter } from 'react-router';
import {
    getTeachersStats
} from './store/actions'

import { ChevronDown } from 'react-feather'


import { DateTime } from '../../components/date-time';
import UILoader from '../../@core/components/ui-loader';

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';
import { StatsItemCard } from '../../views/stats-item-card'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './style.scss'

const Teachers = (props) => {

    const [currentPage, setCurrentPage] = useState(0)

    const {teachersStats} = props

    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }
    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={  teachersStats.teachers.data.length > 0 ?   teachersStats.teachers.data.length / 10 : 1}
            // pageCount={1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            nextClassName='page-item next'
            previousClassName='page-item prev'
            previousLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        />
    )

    const handleViewTeacher = (id) => {
        props.history.push(`/teacher-history/${id}`)
    }

    const onSelect = (student) =>{
        props.history.push({
            pathname: `/assign-unassign-teacher`,
            state: { user: student , isTeacher:false }
        })
    }

    const columns = [
        {
            name: 'Name',
            sortable: true,
            minWidth: '250px',
            cell: t => {
                return (
                    <>
                        {
                            t.name
                        }
                    </>
                )
            }
        },
        {
            name: 'Email',
            sortable: true,
            minWidth: '250px',
            cell: t => {
                return (
                    <>
                        {
                            t.email
                        }
                    </>
                )
            }
        },
        {
            name: 'Date/Time',
            sortable: false,
            minWidth: '100px',
            cell: t => {
                return (
                    <>
                        <DateTime dateTime={t.createdAt} />
                    </>
                )
            }
        },
        {
            name: 'Action',
            minWidth: '250px',
            cell: t => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => handleViewTeacher(t.userId)}
                        >
                            View
                        </Button.Ripple>
                    </>
                )
            }
        },
        {
            name: 'Unassign',
            minWidth: '250px',
            cell: t => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => onSelect(t)}
                        >
                            Unassign 
                        </Button.Ripple>
                    </>
                )
            }
        },
    ]

    useEffect(() => {
        props.getTeachersStats()
    }, [])

    return (
        <Fragment >
            <UILoader
                blocking={props.teachersLoading}
            >
                <Card>
                    <CardBody >
                        <Row className="d-flex align-items-center">
                            <Col sm='6'>
                                <h4 className="m-0">
                                    Teachers
                                </h4>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Teachers January"}
                                    value={teachersStats.thisMonthCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Teachers 2021"}
                                    value={teachersStats.thisYearCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Teachers All"}
                                    value={teachersStats.allTimeCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Teachers Active"}
                                    value={teachersStats.activeCount}
                                />
                            </Col>
                        </Row>
                        <div className="shadow-stats-item mt-3">
                            {
                                !props.teachersLoading &&
                                props.teachersError &&
                                <NoNetwork message={props.teachersError} />
                            }
                            {
                                !props.teachersLoading &&
                                !props.teachersError &&
                                teachersStats.teachers &&
                                teachersStats.teachers.data &&
                                teachersStats.teachers.data.length == 0 &&
                                <NotFound message="No teacher found" />
                            }
                            {
                                !props.teachersLoading &&
                                !props.teachersError &&
                                teachersStats.teachers &&
                                teachersStats.teachers.data &&
                                teachersStats.teachers.data.length > 0 &&
                                <DataTable
                                    noHeader
                                    pagination
                                    columns={columns}
                                    paginationPerPage={10}
                                    className='react-dataTable '
                                    sortIcon={<ChevronDown size={10} />}
                                    paginationDefaultPage={currentPage + 1}
                                    paginationComponent={CustomPagination}
                                    data={teachersStats.teachers.data}
                                />}
                        </div>
                    </CardBody>
                </Card>
            </UILoader >
        </Fragment >
    )
}

const mapStateToProps = (state) => {

    const {
        teachersStats,
        teachersError,
        teachersLoading,
    } = state.Teachers

    return {
        teachersStats,
        teachersError,
        teachersLoading,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getTeachersStats
    })(Teachers)
)
