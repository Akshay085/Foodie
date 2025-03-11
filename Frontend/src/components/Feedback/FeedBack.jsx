import React, { useState, useContext } from 'react';
import { Rating, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import Loaderfrount from '../MyLottieAnimation/Loaderfrount';

const FeedBack = ({ orderId, fetchFeedback, userId, orders }) => {
  const { url, token } = useContext(StoreContext);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("User ID is missing!");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(url + "/api/review/add", {
        orderId,
        rating,
        userId,
      });

      if (response.data.success) {
        toast.success("Feedback submitted successfully!");
        await fetchFeedback(orders);
      } else {
        toast.error("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback", error);
      toast.error("Error submitting feedback.");
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6" style={{ fontSize: "12px" }}>
        Give Food Rating
      </Typography>
      <Rating
        name="user-feedback"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
      />
      <br />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: "0px", margin: "0px" }}
      >
        {loading ? <Loaderfrount /> : "Submit"}
      </Button>
    </Box>
  );
};

export default FeedBack;