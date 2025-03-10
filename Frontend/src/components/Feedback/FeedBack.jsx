import React ,{useState} from 'react'
import {Rating, Button, Box, Typography} from '@mui/material'
import {toast} from 'react-hot-toast'
const FeedBack = () => {
    const [rating,SetRating]=useState(0);
    const handleSubmit=()=>{
        toast("Submited")
    }
  return (
    <Box>
        <Typography variant='h4'>
            Give Food Rating
        </Typography>
        <Rating
        name="user-feedback"
        // value={value}
        // onChange={(event, newValue) => SetRating(newValue)}
      />
      <br />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}

export default FeedBack