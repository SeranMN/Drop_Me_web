import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { height } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  radius: 0.5,
  boxShadow: 24,
  p: 3,

};
const textFieldStyle = {
  margin: 2,
  width: 300,
}
const statuses = [
  {
    value: 'Runing',
    label: 'Runing'
  },
  {
    value: 'Not Runing',
    label: 'Not Runing'
  }
]


export default function EditBus({setToggle,toggle,data}) {  

  const [busNo, setBusNo] = React.useState(data? data.BusNo : '')
  const [busName, setBusName] = React.useState(data? data.BusName : '');
  const [model, setbusmodel] = React.useState(data? data.Model : '');
  const [capacity, setCapacity] = React.useState(data? data.Capacity : '');
  const [status, setStatus] = React.useState(data? data.Status : '')
  const [open1, setOpen1] = React.useState(false)

  const handleOpen1 = () =>{ 
    setOpen1(true)
  }

  const handleClose1 = () => setOpen1(false);

  const onSubmit = (e) => {
    const bus = {
      BusNo: busNo,
      BusName: busName,
      Model: model,
      Capacity: capacity,
      Status: status
    };

    console.log('bus',bus)

    axios.put(`http://localhost:5000/bus/edit/${data._id}`, bus)
      .then(() => {
        alert('Edited successfully')
        setToggle(!toggle)
        handleClose1()
      })
      .catch((err) => console.log(err))
  }

  const handleClear = (e) => {
    e.preventDefault()
    setBusNo('')
    setBusName('')
    setbusmodel('')
    setCapacity('')
    setStatus('')
  }

  return (
    <div>
      <Button onClick={handleOpen1} variant='contained'>Edit</Button>
      <Modal
        keepMounted
        open={open1}
        onClose={handleClose1}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ color: 'blue' }} id="keep-mounted-modal-title" variant="h6" align='center' component="h2">
            Edit Bus
          </Typography>
            <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setBusNo(e.target.value) }} label='Bus No' margin="normal" variant="outlined" value={busNo} />
            <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setBusName(e.target.value) }} margin="normal" label="Bus Name" variant="outlined" value={busName} />
            <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setbusmodel(e.target.value) }} margin="normal" label="Model" variant="outlined" value={model} />
            <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setCapacity(e.target.value) }} margin="normal" label="Capacity" variant="outlined" value={capacity} />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={status}
              defaultValue=''
              onChange={(e) => { setStatus(e.target.value) }}
              helperText="Please select bus status"
              sx={{ width: '100%' }}
              InputProps={{ sx: { height: 40 } }}
              margin="normal"
            >
              {statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{display:'flex', justifyContent:'space-around'}}>
              <Button variant='contained' onClick={handleClear}>Clear</Button>
              <Button type='submit' variant='contained' onClick={onSubmit}>Edit</Button>
            </Box>
        </Box>

      </Modal>
    </div>
  );
}