import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { addShoppingTrolley } from "../../actions/addShoppingTrolley";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { conectLS } from "../../actions/conectLS.js";
import React, { useEffect } from "react";


const useStyles = makeStyles({
  card: {
    margin: "10px",
    minHeight: "30rem",
  },
  cardContent: {
    direction: "row",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
    width: 310,
  },
});

export default function Cards({ ele }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = (ele)=>{
    dispatch(addShoppingTrolley(ele));
  }
  useEffect(() => {
    // dispatch(getNFTs());
    dispatch(conectLS())
    // return () => {
    //   dispatch(getNFTs());
    // };
  }, [dispatch]);

  return (
    <div>
      <Card className={classes.card}
      >
        <CardHeader
          action={
            <IconButton>
              <StarBorderIcon />
            </IconButton>
          }
          />
        <CardMedia
          component={Link}
          to={`nft/${ele._id}`}
          className={classes.media}
          image={ele.image ? ele.image : ele.images}         
          title={ele.name}
          />
        <CardContent className={classes.cardContent}>
          <Typography>{ele.name}</Typography>
          <Typography>Price: {ele.price}ETH</Typography>
          <AddShoppingCartIcon onClick={() => handleClick(ele)} />
        </CardContent>
      </Card>
    </div>
  );
}
