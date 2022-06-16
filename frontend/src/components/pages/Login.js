import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import { useHistory } from "react-router-dom";
import UserContext from '../../context/user-context';


const Login = () => {
    const ctx = React.useContext(UserContext);
    const history = useHistory()
    const [formData, setFormData] = React.useState({
        mobile: {
            value: '',
            error: false,
            helperText: ''
        },
        email: {
            value: '',
            error: false,
            helperText: ''
        },
        password: {
            value: '',
            error: false,
            helperText: ''
        },
        showPassword: false,
      });
      const [checked, setChecked] = React.useState(true);

    const handleSwitch = (event) => {
        setChecked(event.target.checked);
        console.log(event.target.checked)
    };
    
      const handleChange = (field) => (e) => {
        const val = formData[field];
        val.value = e.target.value;
        setFormData({ ...formData, [field]:val });
      };
    
      const handleClickShowPassword = () => {
        setFormData({
          ...formData,
          showPassword: !formData.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    const loginHandler = async(e) => {
        e.preventDefault();

        for (const key in formData) {
            if (typeof formData[key] === 'object') {
                if(formData[key]['value'].trim() === ''){
                    if((key == 'mobile' && !checked) || (key=='email' && checked) || key == 'password'){
                        const val = formData[key];
                        val.error = true;
                        val.helperText = "Enter a value"
                        setFormData({ ...formData, [key]:val });
                    }
                    
                }
            }
        }

        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailPattern.test(formData.email.value)){
            const val = formData['email'];
            val.error = true;
            val.helperText = "Enter valid email"
            setFormData({ ...formData, email:val });
        }
        const phonePattern = /^[7-9][0-9]{9}$/;
        if(!phonePattern.test(formData.mobile.value)){
            const val = formData['mobile'];
            val.error = true;
            val.helperText = "Enter valid mobile number"
            setFormData({ ...formData, mobile:val });
        }
        if(formData.password.value < 8){
            const val = formData['password'];
            val.error = true;
            val.helperText = "Password must have a minimum length of 8 characters"
            setFormData({ ...formData, password:val });
        }

        try{
            const res = await fetch('http://localhost:5000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: formData.mobile.value,
                    email: formData.email.value,
                    password: formData.password.value
                })
            })

            const resData = await res.json();
            console.log(resData);
            if(resData.user){
                ctx.login(resData);
                history.push("/") 
            }
            
        }catch(err){
            console.log(err);
        }

    }
    return(
        <>
            <h1>Login</h1>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', p: 2, border: '1px solid grey' }}>
                    <div>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>With Mobile</Typography>
                            <Switch
                            checked={checked}
                            onChange={handleSwitch}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography>With Email</Typography>
                        </Stack>
                    </div>
                    {!checked &&
                        <div>
                            <TextField
                                fullWidth
                                error={formData.mobile.error}
                                id="input-with-icon-textfield"
                                label="Mobile"
                                onChange={handleChange('mobile')}
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalPhoneIcon />
                                    </InputAdornment>
                                ),
                                }}
                                margin="normal"
                                helperText={formData.mobile.helperText}
                            />
                        </div>
                    }
                    {checked && 
                        <div>
                            <TextField
                                fullWidth
                                error={formData.email.error}
                                id="input-with-icon-textfield"
                                label="Email"
                                onChange={handleChange('email')}
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                ),
                                }}
                                margin="normal"
                                helperText={formData.email.helperText}
                            />
                        </div>
                    }
                    <div>
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                error={formData.password.error}
                                id="outlined-adornment-password"
                                type={formData.showPassword ? 'text' : 'password'}
                                value={formData.password.value}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText error={formData.password.error}>{formData.password.helperText}</FormHelperText>
                        </FormControl>
                    </div>
                    <div>
                        <Button type="submit" variant="contained" size="large" onClick={loginHandler}>Login</Button>
                    </div>
                </Box>
            </Container>
        </>
    )
}


export default Login