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


export default function Add({ handleOpen, handleClose, setToggle, toggle, open, setOpen }) {

  const [busNo, setBusNo] = React.useState('')
  const [busName, setBusName] = React.useState('');
  const [route, setRoute] = React.useState('');
  const [model, setbusmodel] = React.useState('');
  const [capacity, setCapacity] = React.useState('');
  const [status, setStatus] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [price, setPrice] = React.useState('')

  const [busRoute, setBusRoute] = React.useState([])

  const onSubmit = (e) => {
    const bus = {
      BusNo: busNo,
      routeNo: route,
      BusName: busName,
      Model: model,
      Capacity: capacity,
      Status: status,
      Price: price
    };

    const busLogin = {
      email: busNo,
      role: 'bus',
      password: password,
    };

    axios.post('https://dropmebackend.herokuapp.com/bus/add', bus)
      .then(() => {
        alert('Added successfully')
        setToggle(!toggle)
        handleClose()
      })
      .catch((err) => console.log(err))

    axios.post('https://dropmebackend.herokuapp.com/login/add', busLogin)
      .then(() => {
      })
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    axios.get('https://dropmebackend.herokuapp.com/route/')
      .then((res) => {
        let arr = res.data;
        let i;
        let list = [];
        for (i = 0; i < arr.length; i++) {
          list.push({ label: arr[i].routeNo, value: arr[i].routeNo });
        }
        setBusRoute(list)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleClear = (e) => {
    e.preventDefault()
    setBusNo('')
    setBusName('')
    setbusmodel('')
    setCapacity('')
    setStatus('')
    setRoute('')
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />} >Add new</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ color: 'blue' }} id="keep-mounted-modal-title" variant="h6" align='center' component="h2">
            Add Bus
          </Typography>
          <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setBusNo(e.target.value) }} label='Bus No' margin="normal" variant="outlined" value={busNo} />
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={route}
            defaultValue=''
            onChange={(e) => { setRoute(e.target.value) }}
            helperText="Please select bus route No"
            sx={{ width: '100%' }}
            InputProps={{ sx: { height: 40 } }}
            margin="normal"
          >
            {busRoute.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setBusName(e.target.value) }} margin="normal" label="Bus Name" variant="outlined" value={busName} />
          <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setbusmodel(e.target.value) }} margin="normal" label="Model" variant="outlined" value={model} />
          <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setCapacity(e.target.value) }} margin="normal" label="Capacity" variant="outlined" value={capacity} />
          <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setPrice(e.target.value) }} margin="normal" label="Bus Fare" variant="outlined" value={price} />
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
          <TextField type='password' sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setPassword(e.target.value) }} margin="normal" label="Password" variant="outlined" value={password} />
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '30px' }}>
            <Button variant='contained' onClick={handleClear} color='secondary'>Clear</Button>
            <Button type='submit' variant='contained' onClick={onSubmit}>Submit</Button>
          </Box>
        </Box>

      </Modal>
    </div>
  );
}