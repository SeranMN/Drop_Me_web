import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';

const BusDeleteDialog = ({ id }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Button variant='contained' onClick={handleClose}>cancel</Button>
                        <Button variant='contained' color='error' onClick={handleClose} autoFocus>
                            Delete
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default BusDeleteDialog