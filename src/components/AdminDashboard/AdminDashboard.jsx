import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import {useHistory} from 'react-router-dom'
import { Bar } from 'react-chartjs-2'

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInputBase-input": {
      width: "25ch",

    },
    margin: "5px"
  },
  container: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",


  },
  button: {
    margin: '5px'
  }
}))

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: '$ of Completed Payments',
      data: [800, 600, 600, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}


function AdminDashboard(props) {

  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const coaches = useSelector((store) => store.adminCoachReducer);
  const chartData = useSelector((store) => store.chartData)

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: '$ of Completed Payments',
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_CHART_DATA' });
  }, []);

  return (
    <div>
      <div className={classes.container}>

      <h1>Welcome! Where would you like to go:</h1>

        <div className={classes.buttonContainer}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/admin/addUser')}
          className={classes.button}>
          Add New Coach/Client
        </Button>

        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/admin/coachList')}
          className={classes.button}>
          View Coaches
        </Button>

        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/admin/clientList')}
          className={classes.button}>
          View Clients
        </Button>

        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/admin/payouts')}
          className={classes.button}>
          Manage Payouts
        </Button>
        </div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default AdminDashboard;
