import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 2,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

    return (
        <>
    <div style= {{ paddingLeft: '3px', paddingBottom: '5px', paddingTop: '5px' }} className={classes.root}>
      <Button variant="contained">Add Room</Button>
      <Button variant="contained" color="primary">
        Modify Room
      </Button>
      <Button variant="contained" color="secondary">
        Delete Room
      </Button>
    </div>
    <Card style= { { width: "300px", display: "inline-block", paddingLeft: "30px" }} className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Room 1
        </Typography>
        <Typography variant="h5" component="h2">
          Moon Room
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          [id]
        </Typography>
        <Typography variant="body2" component="p">
         (length of stay)
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
          </CardActions>
            </Card>
            <Card style= { { width: "300px", display: "inline-block", paddingLeft: "30px" }} className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Room 2
        </Typography>
        <Typography variant="h5" component="h2">
          Moon Room
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          [id]
        </Typography>
        <Typography variant="body2" component="p">
         (length of stay)
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
          </CardActions>
            </Card>
            <Card style= { { width: "300px", display: "inline-block", paddingLeft: "30px" }} className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Room 3
        </Typography>
        <Typography variant="h5" component="h2">
          Moon Room
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          [id]
        </Typography>
        <Typography variant="body2" component="p">
         (length of stay)
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
          </CardActions>
      </Card>
      </>
  );
}



