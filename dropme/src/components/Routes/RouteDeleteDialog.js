import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';
import axios from 'axios';

const RouteDeleteDialog = ({id,setToggle,toggle}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log('id',id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        console.log('id',id)
        axios.delete(`https://dropmebackend.herokuapp.com/route/delete/${id}`)
            .then(() => {
                alert('deleted successfully')
                setToggle(!toggle)
                handleClose()
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Button sx={{ marginLeft: '4px' }} variant='contained' color="error" onClick={handleClickOpen}>Delete</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <div>
                            <CancelIcon sx={{ fontSize: '3rem', color: 'red' }} />
                        </div>
                        <div>
                            {"Are you sure?"}
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You will not be able recover this record
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box>
                        <Button sx={{ mr: '100px' }} variant='contained' onClick={handleClose}>cancel</Button>
                        <Button variant='contained' color='error' onClick={handleDelete} autoFocus>
                            Delete
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default RouteDeleteDialog