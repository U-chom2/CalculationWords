import React from 'react';
import { makeStyles, Theme, createStyles, styled } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
    paper: {
      position: 'absolute',
      width: 1200,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const wordOrg = (
  modalStyle:any,
  classes:any,
  word1:string,
  word2:string,
  words:string[],
  operation:string,
  illust1:string,
  illust2:string,
  illust3:string) => {
  return (
    <div style={modalStyle} className={classes.paper}>
      {/* 12になるように */}
      <Grid container spacing={4}>
        <Grid item xs={3} md={3}>
          <Item>{word1}</Item>
        </Grid>
        <Grid item xs={3} md={1}>
          <Item>{operation}</Item>
        </Grid>
        <Grid item xs={3} md={3}>
          <Item>{word2}</Item>
        </Grid>
        <Grid item xs={3} md={1}>
          <Item>=</Item>
        </Grid>
        <Grid item xs={3} md={4}>
          <Item>{words[0]}</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={9} md={4}>
          <Item>{showImages(illust1)}</Item>
        </Grid>
        <Grid item xs={9} md={4}>
          <Item>{showImages(illust2)}</Item>
        </Grid>
        <Grid item xs={9} md={4}>
          <Item>{showImages(illust3)}</Item>
        </Grid>
      </Grid>
    </div>
  )
}

const word1Length2 = (
  modalStyle:any,
  classes:any,
  word1:string,
  word2:string,
  words:string[],
  operation:string,
  illust1:string[],
  illust2:string,
  illust3:string) => {
  return (
    <div style={modalStyle} className={classes.paper}>
      {/* 12になるように */}
      <Grid container spacing={4}>
        <Grid item xs={3} md={2}>
          <Item>{word1[0]}</Item>
        </Grid>
        <Grid item xs={3} md={1}>
          <Item>{operation}</Item>
        </Grid>
        <Grid item xs={3} md={2}>
          <Item>{word2}</Item>
        </Grid>
        <Grid item xs={3} md={1}>
          <Item>+</Item>
        </Grid>
        <Grid item xs={3} md={2}>
          <Item>{word1[1]}</Item>
        </Grid>
        <Grid item xs={3} md={1}>
          <Item>=</Item>
        </Grid>
        <Grid item xs={3} md={3}>
          <Item>{words[0]}</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={9} md={3}>
          <Item>{showImages(illust1[0])}</Item>
        </Grid>
        <Grid item xs={9} md={3}>
          <Item>{showImages(illust2)}</Item>
        </Grid>
        <Grid item xs={9} md={3}>
          <Item>{showImages(illust1[1])}</Item>
        </Grid>
        <Grid item xs={9} md={3}>
          <Item>{showImages(illust3)}</Item>
        </Grid>
      </Grid>
    </div>
  )
}
const word2Length2 = (
  modalStyle:any,
  classes:any,
  word1:string,
  word2:string,
  words:string[],
  operation:string,
  illust1:string,
  illust2:string[],
  illust3:string) => {
  return (
    <div style={modalStyle} className={classes.paper}>
      {/* 12になるように */}
      <Grid container spacing={4}>
        <Grid item xs={3} md={2}>
          <Item>{word1}</Item>
        </Grid>
        <Grid item xs={3} md={1}>
          <Item>{operation}</Item>
        </Grid>
        <Grid item xs={3} md={2}>
          <Item>{word2[0]}</Item>
        </Grid>
        <Grid item xs={3} md={1}>
          <Item>-</Item>
        </Grid>
        <Grid item xs={3} md={2}>
          <Item>{word2[1]}</Item>
        </Grid>
        <Grid item xs={3} md={1}>
          <Item>=</Item>
        </Grid>
        <Grid item xs={3} md={3}>
          <Item>{words[0]}</Item>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={9} md={3}>
          <Item>{showImages(illust1)}</Item>
        </Grid>
        <Grid item xs={9} md={3}>
          <Item>{showImages(illust2[0])}</Item>
        </Grid>
        <Grid item xs={9} md={3}>
          <Item>{showImages(illust2[1])}</Item>
        </Grid>
        <Grid item xs={9} md={3}>
          <Item>{showImages(illust3)}</Item>
        </Grid>
      </Grid>
    </div>
  )
}

const showImages = (data:string) => {
  const byte = data.replace("b'","").replace("'","");
  const out = "data:image/png;base64," + byte;
  return (<img src={out} style={{maxHeight: "500px"}}/>)
}

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SimpleModal = (modalData:modalType) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  if (!modalData.words.length){
    return (<div>No Words</div>);
  }

  else {
    const illust1:string[] = modalData.image1.split("!@#$", 20);//こいつは上限2で出す
    const illust2:string[] = modalData.image2.split("!@#$", 20);//こいつは上限2で出す
    const illust3:string[] = modalData.image3.split("!@#$", 20);//こいつは0番目だけ出す

    if (modalData.word1.length === 2){
      return word1Length2(modalStyle,classes,modalData.word1,modalData.word2,modalData.words,modalData.operation,illust1,illust2[0],illust3[0]);
    }
    if (modalData.word2.length === 2){
      return word2Length2(modalStyle,classes,modalData.word1,modalData.word2,modalData.words,modalData.operation,illust1[0],illust2,illust3[0]);
    }
    return wordOrg(modalStyle,classes,modalData.word1,modalData.word2,modalData.words,modalData.operation,illust1[0],illust2[0],illust3[0]);
  }
}

export default SimpleModal;