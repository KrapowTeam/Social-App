import React, { useEffect, useState, useContext } from 'react';
import '../styles/Profile.css';
import { faHeart, faCog, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import { UserContext } from '../../App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
export default function Admin() {
  const { state, dispatch } = React.useContext(UserContext);
  const [data, setData] = useState({});
  const [search, setSearch] = useState(null);

  React.useEffect(() => {
    console.log(state);
    fetch('/logs', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData({
          columns: [
            {
              label: 'Email',
              field: 'email',
              sort: 'asc',
              width: 150,
            },
            {
              label: 'Event',
              field: 'event',
              sort: 'asc',
              width: 150,
            },
            {
              label: 'Date',
              field: 'time',
              sort: 'asc',
              width: 150,
            },
          ],
          rows: res.logs,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className='all'>
        <h3>history Login-Logout</h3>
        {/* <input
          type='text'
          placeholder='email/action...'
          onChange={(e) => e.target.value}
        /> */}
        <MDBDataTable striped bordered small data={data} />
        {/* {data.map((val, key) => {
            return (
              <>
                <tbody>
                  <tr>
                    <td>{val.email}</td>
                    <td>{val.event}</td>
                    <td>{moment(val.time).startOf('day').fromNow()}</td>
                  </tr>
                </tbody>
              </>
            );
          })} */}
      </div>
    </>
  );
}
