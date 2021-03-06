import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: '20px'
    },
    header: {
        backgroundColor: '#99C0FF',
        color: '#001844',
    },
}))

export default function AdminPayoutsDetailsHistory() {

    const dispatch = useDispatch()
    const params = useParams()
    const classes = useStyles()

    const details = useSelector(store=>store.payoutsHistory)

    const columns = [
        {
            field: 'client_name',
            headerName: 'Client Name',
            flex: 1,
            sortable: true,
            description: 'Name of client',
            headerClassName: classes.header,
        },
        {
            field: 'amount_paid',
            headerName: 'Amount Paid',
            flex: 1,
            sortable: true,
            valueFormatter: (params) => (`$${params?.value?.toFixed(2)}`),
            description: '75% of the client\'s payment to Leif. This does not account for the 5% to Leif or the 20% in administrative fees to Talent Signal',
            headerClassName: classes.header,
        },
        {
            field: 'payout_date',
            headerName: 'Date Paid',
            flex: 1,
            sortable: true,
            description: 'Date payment was completed via Melio',
            headerClassName: classes.header,
        },
    ]

    useEffect(() => {
        dispatch({type: 'SEE_FULL_PAYMENT_DETAILS', payload: params.number})
      }, [])

    return(
        <>
        <div className="details-box">
        <h1>Payment Number: {params.number}</h1>
        </div>
        <div className={classes.container}>
                <div style={{ height: 600, width: '80%', display: 'flex', cursor: 'pointer' }} className="center_table">
                    <DataGrid rows={details} columns={columns} pageSize={15} checkboxSelection={false} />
                </div>
            </div>
        </>
    )
}
