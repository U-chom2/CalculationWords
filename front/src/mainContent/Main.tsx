import { Button, createStyles, FormControl, InputLabel, makeStyles, Select, TextField, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import CallWords from './CallWords';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
        display: 'flex'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Main = () => {
    const classes = useStyles();
    const [word1, setWord1] = useState('');
    const [word2, setWord2] = useState('');
    const [operation, setOperation] = useState('');

    const handleChangeWord1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord1(event.target.value);
    };
    const handleChangeWord2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord2(event.target.value);
    };
    const handleChangeOperation = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setOperation(event.target.value as string);
    };
    const handleChangeWords = async () => {
        const words = CallWords({word1:word1, word2:word2, operation:operation});
        alert((await words).words);
    };

    return (
        <div>
            <div className={classes.main}>
                <form noValidate autoComplete="off">
                    <TextField 
                        label="Word1" 
                        variant="outlined" 
                        value={word1}
                        onChange={handleChangeWord1}
                    />
                </form>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="Operation">Operation</InputLabel>
                    <Select
                        native
                        value={operation}
                        onChange={handleChangeOperation}
                        label="Operation"
                        inputProps={{
                            name: 'operation',
                            id: 'Operation',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={'+'}>+</option>
                        <option value={'-'}>-</option>
                    </Select>
                </FormControl>
                <form noValidate autoComplete="off">
                    <TextField 
                        label="Word2" 
                        variant="outlined" 
                        value={word2}
                        onChange={handleChangeWord2}
                    />
                </form>
            </div>
            <Button onClick={() => handleChangeWords() } variant="contained" color="primary">
                検索
            </Button>
        </div>
    )
}

export default Main;