// @flow
import React from 'react';
import moment from "moment";

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  heading: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 26
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

// @flow weak
const BucketlistCard = (props: Object) : HTMLElement => {
  const classes = props.classes;
  return(
    <div>
      <Grid>
          <Typography className={classes.heading} type="headline" component="h1">
            Your Bucket Lists
          </Typography>
      </Grid>
       <Grid container spacing={24}>
        {(props.buckets.length > 0) ? props.buckets.map((bucket) =>
          <Grid item xs={3} key={bucket.id} className="text-center">
            <Card className={classes.card}>
              <CardContent>
                <Typography type="body1" className={classes.title}>
                  {bucket.id}
                </Typography>
                <Typography type="headline" component="h2">
                  {bucket.name}
                </Typography>
                 <Typography type="body1" className={classes.pos}>
                  created on: {moment(bucket.created_at).format("YYYY-DD-MM h:mm")}
                </Typography>
                <Typography component="p">
                  {bucket.description}
                </Typography>
              </CardContent>
              <CardActions className="text-center">
                <Grid item xs={6}>
                  <Button dense>View Items</Button>
                </Grid>
                <Grid item xs={6}>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ) : <p>No Bucketes found</p>
        }
      </Grid>
    </div>
  )
}


export default withStyles(styles)(BucketlistCard);
