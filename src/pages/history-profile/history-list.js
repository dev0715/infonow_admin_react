import React from 'react';
import {
    CardBody,
    Table
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import PropTypes from 'prop-types';
import CardReload from '../../@core/components/card-reload';
import { Button } from 'reactstrap'



const HistoryList = (props) => {

    const { users, isTeacher, fetchHistory, isReloading  } = props;
 

    return (
        <CardReload className="p-0 test-list"
            title={isTeacher ? 'Students' : 'Teachers'}
            onReload={fetchHistory}
            isReloading={isReloading}>
           
            <CardBody>
                <Table responsive hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users && users.map((u, i) =>

                            <tr key={u.userId} >
                                <td>{i + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {u.name}
                                    </span>
                                </td>
                                <td><DateTime dateTime={u.createdAt} type="dateTime" /></td>
                                <td>
                                    <Button.Ripple  color='flat-primary' >
                                        <span className='align-middle'>View</span>
                                    </Button.Ripple>
                               </td>
                              
                            </tr>
                        )}
                    </tbody>
                </Table>
            </CardBody>
        </CardReload>
    );
};


HistoryList.propTypes = {
    users: PropTypes.array.isRequired,
    onBack: PropTypes.func
}


export default HistoryList;



