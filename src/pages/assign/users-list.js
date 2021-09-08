import React from 'react';
import { useState, Fragment } from 'react';

import {
    CardBody,
    Card,
    CardText,
    Row,
    Col,
    CardHeader, CardTitle, Label, Input,
} from 'reactstrap';


import { ChevronDown } from 'react-feather'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { Button } from 'reactstrap';
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import CardReload from '../../@core/components/card-reload';

const UsersList = (props) => {

    const { listData , fetchListData , isReloading ,isTeacher } = props;
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const onAssignTeacher = (teacher) => {
        props.onAssignTeacher(teacher)
    }

    const onUnAssignTeacher = (student) =>{
        props.onUnassignTeacher(student)
    }

    // ** Function to handle filter
    const handleFilter = e => {
        setSearchValue(e.target.value)

        // dispatch(
        //     getData({
        //         page: currentPage,
        //         perPage: rowsPerPage,
        //         q: e.target.value
        //     })
        // )
    }

    // ** Function to handle Pagination and get data
    const handlePagination = page => {
        // dispatch(
        //     getData({
        //         page: page.selected + 1,
        //         perPage: rowsPerPage,
        //         q: searchValue
        //     })
        // )
        setCurrentPage(page.selected + 1)
    }

 

    // ** Custom Pagination
    const CustomPagination = () => {
        // const count = Number((store.total / rowsPerPage).toFixed(0))
        const count = 1
        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                breakLabel='...'
                pageCount={count || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName={
                    'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
                }
            />
        )
    }

    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            minWidth: '225px'
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: 'Start Date',
            selector: 'createdAt',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: 'Assign' ,
            minWidth: '250px',
            omit: !isTeacher,
            cell: t => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => onAssignTeacher(t)}
                        >
                            Assign
                        </Button.Ripple>
                    </>
                )
            }
        },
        {
            name: 'Unassign',
            minWidth: '250px',
            omit: isTeacher,
            cell: s => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => onUnAssignTeacher(s)}
                        >
                              Unassign
                        </Button.Ripple>
                    </>
                )
            }
        },
    ]


    return (
        <Fragment>
            <CardReload
            title={isTeacher ? 'Teachers' : 'Students'}
             onReload={fetchListData}
             isReloading={isReloading}>
               
                <Row className=' mx-0 mt-1 mb-50'>
                    <Col className=' d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='12'>
                        <Label className='mr-1' for='search-input'>
                            Search
                        </Label>
                        <Input
                            className='text-right dataTable-filter'
                            type='text'
                            bsSize='sm'
                            id='search-input'
                            value={searchValue}
                            onChange={listData}
                        />
                    </Col>
                </Row>

                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    className='react-dataTable'
                    columns={columns}
                    sortIcon={<ChevronDown size={10} />}
                    paginationComponent={CustomPagination}
                    data={listData}
                />
            </CardReload>
        </Fragment>
    );
};

export default UsersList


