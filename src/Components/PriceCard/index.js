import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FaBitcoin } from "react-icons/fa";

export default function PriceCard(props) {
    const {eachItem} = props
    const {code,rate,description} = eachItem
  return (
    <li className='bg-stone-800 mr-3 mt-3'>
    <Card className='bg-stone-800 w-full' sx={{ maxWidth: 345 }} color="primary">
      <CardActionArea>
        <div className='flex px-4 py-1 items-center'>
        <FaBitcoin className='text-4xl text-yellow-400' />
        <p className='ml-2 text-xl font-bold bg-gradient-to-r from-yellow-400  to-stone-800 inline-block text-transparent bg-clip-text'>BitCoin</p>
        </div>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {rate} {code}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          BUY
        </Button>
      </CardActions>
    </Card>
    </li>
  );
}