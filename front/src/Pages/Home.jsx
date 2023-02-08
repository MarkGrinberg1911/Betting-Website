import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from '../App';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client'
import { CLIENT_ID } from '../Config/ppconfig'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const socket = io("http://localhost:2000")




function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export default function Home() {
  const { productList, username, setProductList } = useContext(UserContext)
  const [bid, setBid] = useState()
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Sunflower",
          amount: {
            currency_code: "USD",
            value: 20,
          },
        },
      ],
    }).then((orderID) => {
      setOrderID(orderID);
      return orderID;
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };
  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log('Order successful . Your order id is--', orderID);
    }
  }, [success]);


  useEffect(() => {

    socket.on("connection", console.log("FUCKING CONNECTED"))
    socket.on("recive-bid", onRecivedBid)
    return () => {
      socket.off("connection")
      socket.off("recive-bid")
    }

  }, [])
  const onRecivedBid = async (bid) => {
    console.log(bid, "This is bid")
    const temp = productList
    console.log("prd list ", productList)
    const index = temp.findIndex((product) => {
      console.log(product, "this is product")
      console.log(temp, "this is temp")
      return product._id === bid._id
    })
    console.log(index, "this is index")
    temp[index].price = bid.bid;
    temp[index].highbid = bid.username
    setProductList([...temp])
  }







  const Bid = async (_id, price) => {
    console.log(_id)
    if (price < bid) {
      axios.post(`http://localhost:8000/BidUpdate/${_id}`, { price: bid, highbid: username })
      socket?.emit("send-bid", { _id, bid, username })

    }
    else { console.log("CANNOT BID LESS THAN PRICE") }

  }
  console.log(productList)




  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <SportsFootballIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            My Bets
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Todays Items            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Master better not responsible for anything
              <br />
              bet bet bet
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {productList.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card?.picture}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card?.name}
                    </Typography>
                    <Typography >
                      {card?.description}
                      <br />
                      <hr />
                      <Typography fontWeight={'bold'}>
                        Price is : ${card?.price}
                        <br />
                        Highest bidder = {card?.highbid}
                      </Typography>
                      <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                        <div>
                          <div className="wrapper">
                                <Button variant="contained" className='buy-btn' type="submit" onClick={() => setShow(true)}>
                                  Buy now
                                </Button>
                              
                            
                          </div>
                          <br></br>
                          {show ? (
                            <PayPalButtons
                              style={{ layout: "vertical" }}
                              createOrder={createOrder}
                              onApprove={onApprove}
                            />
                          ) : null}
                        </div>
                      </PayPalScriptProvider>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => Bid(card._id, card.price,)} size="small">Bid</Button>
                    <TextField onChange={(e) => setBid(e.target.value)} size="small"></TextField>

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}