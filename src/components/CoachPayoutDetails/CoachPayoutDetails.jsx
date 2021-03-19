import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';


import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  dashContainer: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  pickerContainer: {
    position: 'relative',
    left: '7.5vw',
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '2rem'
  },
  buttonContainer: {
    // marginLeft: '2rem'
    marginTop: '20px'
  },
  coachPayoutHeading: {
    marginTop: '40px',
    position: 'relative',
    left: '7vw'
  },
  root: {
    "& .MuiInputBase-input": {
        width: "25ch",
    },
    ".MuiDataGrid-row": {
      cursor: 'pointer',
      color: 'white'
    },
    margin: "5px"
},
  container: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#001844",
    color: 'white',
  },
  cell: {
    align: 'center',
  }
}))

function CoachPayoutDetails(props) {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const payments = useSelector((store) => store.coachPaymentDetailsReducer);
  const [heading, setHeading] = useState('Payout Details');

  const [monthDate, setMonthDate] = useState('');

  const columns = [
    {
      field: 'full_name',
      headerName: 'Client Name',
      flex: 1,
      sort: true,
      headerClassName: classes.header
    },
    {
      field: 'scheduled_date',
      headerName: 'Scheduled Date',
      flex: 1,
      sort: true,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString("en-us"),
      description: `Date the client's payment was scheduled`,
      headerClassName: classes.header
    },
    {
      field: 'payment_status',
      headerName: 'Payment Status',
      flex: 1,
      sort: true,
      description: `Status of the payment`,
      headerClassName: classes.header
    },
    {
      field: 'amount',
      headerName: 'Total Payment',
      flex: 1,
      sort: true,
      valueFormatter: (params) => (params.value.toFixed(2)),
      description: `Payment amount received by Talent Signal from job seeker`,
      headerClassName: classes.header
    },
    {
      field: 'total_paid',
      headerName: 'Payment Received',
      flex: 1,
      sort: true,
      valueFormatter: (params) => (params.value.toFixed(2)),
      description: `Payment amount received by coach from Talent Signal`,
      headerClassName: classes.header
    },
  ]

  const handleClick = () => {
    console.log('dispatch with ', monthDate);
    dispatch({ type: 'FETCH_COACH_PAYMENT_DETAILS', payload: monthDate })
  }

  useEffect(() => {
    // If arrived via navbar, the page.id will = payments. Just sit here and wait for user to select a month. 
    if (page.id == 'payments') {
      console.log('Do nothing and select the dropdown month selector');
    }
    // get payment details for this month. Can get them with the page.id because this is the payment confirmation number from the Dashboard
    else {
      dispatch({ type: 'FETCH_COACH_PAYMENT_DETAILS_NUMBER', payload: page.id })
    }
  }, [])
  console.log(`page id is ${page.id}`);
  console.log(typeof page.id)
  console.log(`selected value is now ${monthDate}`);

  const handleRowClick = (event) => {
    let userId = event.row.clientId;
    history.push(`/coach/clientDetails/${userId}`);

  }

  return (
    <div>
      <h2 className={classes.coachPayoutHeading}>{heading}</h2>
      <div className={classes.pickerContainer}>
        <TextField
          id="pick month"
          label="Month Picker"
          type="month"
          value={monthDate}
          onChange={(event) => setMonthDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}>
            Submit
          </Button>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className={classes.container}>
        {/* <h1>History:</h1> */}
        <div style={{  width: '85%', display: 'flex' }} className={classes.root, "center_table"}>
          <DataGrid className={classes.root} rowHeight={40} autoHeight={true} rows={payments} columns={columns} sortModel={[{ field: 'scheduled_date', sort: 'desc' },]} pageSize={10} checkboxSelection={false} onRowClick={handleRowClick} />
        </div>
      </div>
    </div>
  );
}

export default CoachPayoutDetails;
