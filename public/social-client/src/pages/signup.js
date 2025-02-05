import React, { Component } from 'react'

import PropTypes from 'prop-types';
import AppIcon from '../images/logo.PNG'
import axios from 'axios'
import { Link } from 'react-router-dom'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme
})

class signup extends Component {

    state= {
        email: '',
        userHandle: '',
        password: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData ={
            Email: this.state.email,
            password: this.state.password,
            userHandle: this.state.userHandle
        }
        
        this.props.signupUser(userData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
        [event.target.name]:event.target.value
    })
    }

    render() {
        const { classes, UI: {loading} } = this.props;
        const {errors} = this.state;
        return (
           <Grid container className={classes.form}>
               <Grid item sm />
                <Grid >
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        id="userHandle"
                        name="userHandle"
                        type="text"
                        label="username"
                        className={classes.textField}
                        helperText={errors.userHandle}
                        error={errors.userHandle?true:false}
                        value={this.state.userHandle}
                        onChange={this.handleChange}
                        fullWidth 
                        />

                        <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email?true:false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth 
                        />
                        
                        <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password?true:false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth 
                        />
                        {errors.error && (<Typography variant="body2" className={classes.customError}>
                            {errors.error}
                        </Typography>)}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            {loading && (<CircularProgress size={30} className={classes.progress}/>)}
                            Sign up</Button><br />
                    </form>
                </Grid>
               <Grid item sm />
           </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
    UI: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})


const mapActionsToProps = {
   signupUser
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(signup))
