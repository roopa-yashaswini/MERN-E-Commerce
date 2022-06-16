import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import UserContext from '../../context/user-context'
import { useHistory } from "react-router-dom";
import InfoModal from '../../components/comp/InfoModal'


const Signup = () => {
    const ctx = React.useContext(UserContext);
    const history = useHistory();
    const [modal, setShowModal] = React.useState({
        display: false,
        title: '',
        text: ''
    });
    const [formData, setFormData] = React.useState({
        firstName: {
            value: '',
            error: false,
            helperText: ''
        },
        lastName: {
            value: '',
            error: false,
            helperText: ''
        },
        gender: {
            value: '',
            error: false,
            helperText: ''
        },
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
        confirmPassword: {
            value: '',
            error: false,
            helperText: ''
        },
        showPassword: false,
      });
    
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

    const sendData = async(e) => {
        e.preventDefault();
        for (const key in formData) {
            if (typeof formData[key] === 'object') {
                if(formData[key]['value'].trim() === ''){
                    const val = formData[key];
                    val.error = true;
                    val.helperText = "Enter a value"
                    setFormData({ ...formData, [key]:val });
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
        if(formData.password.value !== formData.confirmPassword.value){
            const val = formData['confirmPassword'];
            val.error = true;
            val.helperText = "The passwords do not match"
            setFormData({ ...formData, confirmPassword:val });
        }

        try{
            const res = await fetch('http://localhost:5000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: formData.firstName.value,
                    lastName: formData.lastName.value,
                    gender: formData.gender.value,
                    mobile: formData.mobile.value,
                    email: formData.email.value,
                    password: formData.password.value
                })
            })

            const resData = await res.json();
            if(resData.user){
                ctx.login(resData);
                history.push('/');
            }else{
                let obj = {
                    display: true,
                    title: 'Error',
                    text: resData.message
                }

                setShowModal(obj);
            }
            
            console.log(resData);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <h1>Signup</h1>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', p: 2, border: '1px solid grey' }}>
                    <div>
                        <TextField
                            name="firstName"
                            error={formData.firstName.error}
                            id="outlined-error-helper-text"
                            label="First Name"
                            margin="normal"
                            onChange={handleChange('firstName')}
                            helperText={formData.firstName.helperText}
                        />
                        <TextField
                            name="lastName"
                            error={formData.lastName.error}
                            id="outlined-error-helper-text"
                            label="Last Name"
                            margin="normal"
                            onChange={handleChange('lastName')}
                            helperText={formData.lastName.helperText}
                        />
                    </div>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                name="gender"
                                row
                                aria-label="gender"
                                name="radio-buttons-group"
                                onChange={handleChange('gender')}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                            <FormHelperText error={formData.gender.error}>{formData.gender.helperText}</FormHelperText>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            name="mobile"
                            error={formData.mobile.error}
                            id="input-with-icon-textfield"
                            label="Mobile"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalPhoneIcon />
                                </InputAdornment>
                            ),
                            }}
                            margin="normal"
                            onChange={handleChange('mobile')}
                            helperText={formData.mobile.helperText}
                        />
                        <TextField
                            name="email"
                            error={formData.email.error}
                            id="input-with-icon-textfield"
                            label="Email"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AlternateEmailIcon />
                                </InputAdornment>
                            ),
                            }}
                            margin="normal"
                            onChange={handleChange('email')}
                            helperText={formData.mobile.helperText}
                        />
                    </div>
                    <div>
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                name='password'
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
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                error={formData.confirmPassword.error}
                                id="outlined-adornment-password"
                                type={formData.showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword.value}
                                onChange={handleChange('confirmPassword')}
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
                                label="Confirm Password"
                            />
                            <FormHelperText error={formData.confirmPassword.error}>{formData.confirmPassword.helperText}</FormHelperText>
                        </FormControl>
                        
                    </div>
                    <div>
                        <Button type="submit" variant="contained" size="large" onClick={sendData}>Signup</Button>
                    </div>
                </Box>
            </Container>

            {modal.display && <InfoModal title={modal.title} text={modal.text} />}
        </>
    )
}

export default Signup