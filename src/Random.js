import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Chip, Button } from '@material-ui/core';
import moment from "moment";

const styles = theme => ({
    root: {

    },
    container: {
        width: '90%',
        margin: '10px auto',
        textAlign: 'center'
    },
    line1: {
        margin: '10px 0',
        fontSize: '40px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '30px'
        }
    },
    line2: {
        margin: '10px 0',
        fontSize: '30px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px'
        }
    },
    textField: {
        margin: '10px',
        [theme.breakpoints.down('sm')]: {
            width: '70%',
        }
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    button: {
        margin: "10px"
    },
    card: {
        border: '1px solid #bcbab8',
        borderRadius: '5px',
        padding: "5px",
        backgroundColor: "#FFF",
        textAlign: "left"
    },
    cardText: {
        textAlign: "center",
        fontSize: "18px",
        margin: "10px 0",
        '&::after': {
            display: 'block',
            width: '3em',
            height: '3px',
            backgroundColor: theme.palette.error.dark,
            content: '" "',
            margin: '2px auto',
            borderRadius: '2px'
        }
    },
    randomText: {
        margin: "10px 0"
    }
});

class Random extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            list: [],
            randomList: []
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        this.setState({
            date: new Date()
        });
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onValueAdd = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            const list = new Set([...prevState.list, this.state.value]);
            return {
                list: Array.from(list),
                value: ""
            }
        });
    }

    deleteValue = (index) => {
        const values = this.state.list.filter((data, i) => i !== index)
        this.setState({
            list: values
        });
    }

    createRandom = () => {
        this.setState({
            randomList: this.getRandom(this.state.list, this.state.list.length)
        });
    }

    getRandom = (arr, n) => {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <section className={classes.container}>
                    <Typography variant="body1" className={classes.line1}>Hi, there</Typography>
                    <Typography variant="body1" className={classes.line2}>
                        {`Today is ${moment(this.state.date).format("LLLL")}`}
                    </Typography>
                    <br />
                    <form noValidate autoComplete="off" onSubmit={this.onValueAdd}>
                        <TextField
                            label="Value"
                            name="value"
                            type="text"
                            variant="outlined"
                            className={classes.textField}
                            value={this.state.value}
                            onChange={this.inputChangeHandler}
                            size="small"
                        />
                    </form>
                    {
                        this.state.list.map((data, index) => {
                            return (
                                <Chip
                                    key={index}
                                    label={data}
                                    onDelete={() => {
                                        this.deleteValue(index);
                                    }}
                                    className={classes.chip} />
                            )
                        })
                    }
                    <br />
                    <Button
                        className={classes.button}
                        variant="outlined"
                        onClick={this.createRandom}>Create Random</Button>
                    {
                        this.state.randomList.length > 0 ?
                            <div className={classes.card}>
                                <Typography className={classes.cardText} variant="body1">
                                    Results:
                                </Typography>
                                {
                                    this.state.randomList.map((random, index) => {
                                        return (
                                            <Typography className={classes.randomText}
                                                key={index} variant="body1">
                                                {`${index + 1}. ${random}`}
                                            </Typography>
                                        )
                                    })
                                }
                            </div> : null
                    }
                </section>
            </Fragment>
        );
    }
}

Random.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Random);