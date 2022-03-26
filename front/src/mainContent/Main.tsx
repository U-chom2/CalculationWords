import { Box, Button, createStyles, FormControl, InputLabel, makeStyles, Modal, Select, TextField, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import CallWords from './CallWords';
import SimpleModal from './Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type modalType = {
    word1: string,
    word2: string,
    words: [],
    operation: string,
    image1: string,
    image2: string,
    image3: string
}

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
    const [word1, setWord1] = useState('王様,女');
    const [word2, setWord2] = useState('男');
    const [operation, setOperation] = useState('-');
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState<modalType>({
        word1: '',
        word2: '',
        words: [],
        operation: '',
        image1: '',
        image2: '',
        image3: ''
    });
    const handleOpen = async () => {
        const wordsAndImages = CallWords({word1:word1, word2:word2, operation:operation});
        const newModalData = {
            word1:word1,
            word2:word2,
            words:(await wordsAndImages).words,
            operation:operation,
            image1: '',
            image2: '',
            image3: ''
        }
        if (newModalData.words.length){
            newModalData.image1 = (await wordsAndImages).illust1;
            newModalData.image2 = (await wordsAndImages).illust2;
            newModalData.image3 = (await wordsAndImages).illust3;
        }
        setModalData(newModalData);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const handleChangeWord1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord1(event.target.value);
    };
    const handleChangeWord2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord2(event.target.value);
    };
    const handleChangeOperation = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setOperation(event.target.value as string);
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
                        <option aria-label="None" value=" "/>
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
            <Button onClick={handleOpen} variant="contained" color="primary">計算</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {SimpleModal(modalData)}
                    </Typography>
                </Box>
            </Modal>
        </div>
  );
}

export default Main;