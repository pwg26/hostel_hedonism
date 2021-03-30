import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

    return (
      
    <Card className={classes.root}>
      <CardContent style={{ width: "300px", display: "inline-block" }}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Room
        </Typography>
        <Typography variant="h5" component="h2">
          Moon Room
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Open
        </Typography>
              <Typography variant="body2" component="p">
            {/* id of person staying in this room */}
          [id]
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
          </CardActions>
          <br></br>
          <CardContent style={{ width: "200px", display: "inline-block" }}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Room
        </Typography>
        <Typography variant="h5" component="h2">
          Sun Room
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Taken
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
          </CardActions>
          <br></br>
          <CardContent style={{ width: "300px", display: "inline-block" }}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Room
        </Typography>
        <Typography variant="h5" component="h2">
          Honey Moon Suite
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Open
        </Typography>
              <Typography variant="body2" component="p">
            {/* id of person staying in this room */}
          [id]
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
          </CardActions>
          <br></br>
          
      </Card>
      
  );
}
