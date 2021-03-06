import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { useHistory, useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles(() => ({
  input: {
    width: "25ch",
    margin: "10px",
  },
  paymentTableContainer: {
    padding: '20px'
  },
  root: {
    "& .MuiInputBase-input": {
      width: "25ch",
    },
    "& .MuiDataGrid-row": {
      cursor: 'pointer',
      color: '#333'
    },
    margin: "5px"
  },
  header: {
    backgroundColor: '#99C0FF',
    color: 'white',
  },
  tableTitle: {
    position: 'relative',
    left: '120px',
    marginTop: '40px'
  },
  dialogForm: {
    display: 'flex',
    flexFlow: 'column',
    padding: '10px'
  }
}))

function AdminClientDetails(props) {
  const params = useParams()
  const classes = useStyles()

  const clientDetails = useSelector((store) => store.clientDetails)
  const coaches = useSelector((store) => store.adminCoaches)

  const [heading, setHeading] = useState("Admin Client Details")
  const [open, setOpen] = useState(false)
  // const [editMode, setEditMode] = useState(true)
  const [editClient, setEditClient] = useState({
    id: clientDetails.id,
    firstName: clientDetails.first_name,
    lastName: clientDetails.last_name,
    email: clientDetails.email,
    phone: clientDetails.phone,
    coachID: clientDetails.user_id,
    contractID: clientDetails.contract_id,
    contractStatus: clientDetails.contract_status,
    coachingStatus: clientDetails.coaching_status,
  })

  const handleClickOpen = () => {
    setOpen(true)
    setEditClient({
      id: clientDetails.id,
      firstName: clientDetails.first_name,
      lastName: clientDetails.last_name,
      email: clientDetails.email,
      phone: clientDetails.phone,
      coachID: clientDetails.user_id,
      contractID: clientDetails.contract_id,
      contractStatus: clientDetails.contract_status,
      coachingStatus: clientDetails.coaching_status,
    })
    dispatch({ type: "FETCH_ADMIN_COACHES" })

  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClientChange = (e) => {
    const value = e.target.value
    setEditClient({ ...editClient, [e.target.name]: value })
    // console.log(editClient)
  }

  const updateClient = (e) => {
    e.preventDefault()
    // console.log(editClient)
    dispatch({ type: 'UPDATE_CLIENT_DETAILS', payload: editClient })
    setOpen(false)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: "GET_CLIENT_DETAILS", payload: params.id })
  }, [])

  // ------DATAGRID-------
  const columns = [
    {
      field: 'payment_id',
      headerName: 'Payment ID',
      flex: 1.5,
      sort: true,
      description: 'Unique payment identifier generated by Leif',
      headerClassName: classes.header
    },
    {
      field: 'due_date',
      headerName: 'Due Date',
      flex: 1,
      sort: true,
      description: `Date the client's payment is due to Leif`,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString("en-us"),
      type: 'date',
      headerClassName: classes.header
    },
    {
      field: 'payment_status',
      headerName: 'Payment Status',
      flex: 1,
      sort: true,
      description: `Status of the client's payment in the Leif system`,
      headerClassName: classes.header
    },
    {
      field: 'amount',
      headerName: 'Amount Due',
      flex: 1,
      sort: true,
      description: `Payment amount due to Talent Signal from Leif`,
      valueFormatter: (params) => (`$${params.value.toFixed(2)}`),
      headerClassName: classes.header
    },
    {
      field: 'payment_received',
      headerName: 'Payment Received',
      flex: 1,
      sort: true,
      description: `Payment amount received by Talent Signal from Leif`,
      valueGetter: checkStatus,
      headerClassName: classes.header
    },
    {
      field: 'confirmation_number',
      headerName: 'Confirmation ID',
      flex: 1.5,
      sort: true,
      description: `Unique payment identifier generated by this app. If '0', the respective coach has not been paid.`,
      headerClassName: classes.header
    },
  ]

  //check if payment status is complete or not. If no, return 0 for total paid. 
  function checkStatus(params){
    // console.log('value Getter params are', params);
    let total = params.row.amount;
    let status = params.row.payment_status;
    if(status != 'complete'){
      return total = '$0.00';
    }else{
      return `$${total.toFixed(2)}`;
    }
  }

  // leave out everything in clientDetails.payments that equals null. 
    const filteredPayments = clientDetails?.payments?.filter(function (el) {
      return el != null;
    })
  
  return (
    <div>
      {clientDetails && (
        <>
          <div className="details-box">
          <div>
            <h1>
              {clientDetails.first_name}{" "}
              {clientDetails.last_name}
            </h1>
            <h3>Email: {clientDetails.email}</h3>
            <h3>Telephone: {clientDetails.phone}</h3>
            <h3>Contract ID: {clientDetails.contract_id}</h3>
            <Button onClick={handleClickOpen}>Edit Client Details</Button>
          </div>

          <div>
            <h2> Coach: {clientDetails.coach_first_name}{" "}{clientDetails.coach_last_name}</h2>
            <h3>Coaching Status: {clientDetails.coaching_status}</h3>
            <h3>Contract Status: {clientDetails.contract_status}</h3>
          </div>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form className={classes.dialogForm}>
            <DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
            <TextField
              name="firstName"
              onChange={handleClientChange}
              value={editClient.firstName}
            />
            <TextField
              name="lastName"
              onChange={handleClientChange}
              value={editClient.lastName}
            />
            <TextField
              name="email"
              onChange={handleClientChange}
              value={editClient.email}
            />
            <TextField
              name="phone"
              onChange={handleClientChange}
              value={editClient.phone}
            />
            <TextField
              name="contractID"
              onChange={handleClientChange}
              value={editClient.contractID}
            />
            <FormControl className={classes.input}>
              <InputLabel id="coach-select-label">
                Select a Coach
                                </InputLabel>
              <Select
                labelId="coach-select-label"
                id="coach-select"
                name="coachID"
                value={editClient.coachID}
                onChange={(e) => setEditClient({
                  ...editClient,
                  [e.target.name]: e.target.value
                })}
              >
                {coaches.map((coach) => {
                  return <MenuItem key={coach.id} value={coach.id}>
                    {coach.first_name} {coach.last_name}
                  </MenuItem>
                })}

              </Select>
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel id="contract-status-label">
                Contract Status
                                </InputLabel>
              <Select
                labelId="contract-status-label"
                id="contract-status"
                name="contractStatus"
                value={editClient.contractStatus}
                onChange={(e) =>
                  setEditClient({
                    ...editClient,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <MenuItem value={"open"}>Open</MenuItem>
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"closed"}>Closed</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel id="coaching-status-label">
                Coaching Status
                                </InputLabel>
              <Select
                labelId="coach-select-label"
                id="coach-select"
                name="coachID"

                onChange={(e) => setEditClient({
                  ...editClient,
                  [e.target.name]: e.target.value
                })}
              >
                {coaches.map((coach) => {
                  return <MenuItem key={coach.id} value={coach.id}>
                    {coach.first_name} {coach.last_name}
                  </MenuItem>
                })}
              </Select>
            </FormControl>
            <Button onClick={updateClient}>Update Client</Button>
            <Button onClick={handleClose}>Cancel</Button>
            </form>
          </Dialog>
          <h2 className={classes.tableTitle}>Payments</h2>
          {clientDetails?.payments &&
          <div style={{ width: '85%', display: 'flex', }} className={classes.root, "center_table"}>
            <DataGrid rowHeight={40} autoHeight={true} sortModel={[{ field: 'due_date', sort: 'desc' },]} rows={filteredPayments} columns={columns} pageSize={12} checkboxSelection={false} />
          </div>
          }
          
        </>
      )}
    </div>
  )
}

export default AdminClientDetails
