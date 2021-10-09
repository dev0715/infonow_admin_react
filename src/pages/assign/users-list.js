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


import { ChevronDown, RefreshCcw } from 'react-feather'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import CardReload from '../../@core/components/card-reload';

const UsersList = (props) => {

    const { t } = useTranslation()
    const { listData, fetchListData, isReloading, isTeacher } = props;
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const onAssignTeacher = (teacher) => {
        props.onAssignTeacher(teacher)
    }

    const onUnAssignTeacher = (student) => {
        props.onUnassignTeacher(student)
    }

    const searchTeacherByName = () => {
        if (searchValue)
            props.fetchData(searchValue)
    }

    // ** Function to handle Pagination and get data
    const handlePagination = page => {
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
            name: t('Name'),
            selector: 'name',
            sortable: true,
            minWidth: '225px'
        },
        {
            name: t('Email'),
            selector: 'email',
            sortable: true,
            minWidth: '250px'
        },
        {
            name: t('Start Date'),
            selector: 'createdAt',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: t('Assign'),
            minWidth: '250px',
            omit: !isTeacher,
            cell: te => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => onAssignTeacher(te)}
                        >
                            {t('Assign')}
                        </Button.Ripple>
                    </>
                )
            }
        },
        {
            name: t('Unassign'),
            minWidth: '250px',
            omit: isTeacher,
            cell: s => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => onUnAssignTeacher(s)}
                        >
                            {t('Unassign')}
                        </Button.Ripple>
                    </>
                )
            }
        },
    ]


    return (
        <Fragment>
            <CardReload
                title={isTeacher ? t('Teachers') : t('Students')}
                onReload={fetchListData}
                isReloading={isReloading}>

                <Row className=' mx-0 mt-1 mb-50'>
                    <Col className=' d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='12'>
                        <Label className='mr-1' for='search-input'>
                            {t('Search')}
                        </Label>
                        <Input
                            className='text-right dataTable-filter'
                            type='text'
                            bsSize='sm'
                            id='search-input'
                            value={searchValue}
                            onChange={e => { setSearchValue(e.target.value) }}
                        />
                        <Button.Ripple className="btn-icon ml-1" size="sm" onClick={searchTeacherByName}><RefreshCcw size={14} /></Button.Ripple>
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


