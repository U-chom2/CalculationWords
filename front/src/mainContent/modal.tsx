import React from 'react';
import { Buffer } from 'buffer'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const showImages = (data:string) => {
  const byte = data.replace("b'","").replace("'","");
  const out = "data:image/png;base64," + byte;
  return (<img src={out} style={{maxHeight: "200px"}}/>)
}

const SimpleModal = (words: string[],images: string) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const illusts:string[] = images.split("!@#$", 20);

  return (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">
        {words.map( c =>
            <li>{c}</li>
        )}
        {illusts.map( d =>
            showImages(d)
        )}
      </p>
    </div>
  );
}

export default SimpleModal;