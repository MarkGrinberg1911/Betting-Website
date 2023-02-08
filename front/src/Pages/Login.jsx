
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import {useContext, useState} from 'react'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// 1 create a cohirent list of products namly add a picture key:valuee to the DB  
// 2 pull that list on login and put into a context 
// 3 on the homepage pull said context and map it 
// 4 create the betting function button and a "last better"
// 5 create function that send axios with echo to update price value in db while the echo updates the user end. 
// 6 touch up the css with MUI
export default function SignUp() {
  const theme = createTheme();
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const {setId, productList, setProductList, setUsername}=useContext(UserContext)
  
  const Navigate=useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/Login", { email:email , password:password})
      
      if (res.data) {
        console.log(res.data)
        setUsername(res.data.respo.username)
        setId(res.data.respo.id)
        console.log(res.data.respo.id)
        localStorage.setItem("token", JSON.stringify(res.data.respo.token))
        localStorage.setItem("id", JSON.stringify(res.data.respo.id))
        axios.post("http://localhost:8000/ProductList")
                .then((data) =>{ 
                  setProductList(data.data.list)
                Navigate("/Pages/Home")
              })
              }
            }
            catch (error) {
              console.log(error)
            }
          };
          console.log(password)
          
          console.log(productList)
          return (
            <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Avatar sx={{ m: 1,bgcolor:"black" }}>
            <SportsFootballIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                onChange={(e)=>setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                onChange={(e)=>setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Pages/SignUp" variant="body2">
                  New Master better? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}