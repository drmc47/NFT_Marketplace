import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTs} from "../../actions/getNFTs.js";
import { makeStyles } from '@material-ui/core/styles';
import Cards from "../card/card.jsx"
import Grid from '@material-ui/core/Grid';
import Search from "../Search/Search.jsx"
import Slider from 'react-slick'
import "./categories.css"

const useStyles = makeStyles((theme) => ({
    
    gridContainer: {
      marginTop: "30px"
    }
  }));

export default function Categories() {
  const classes = useStyles();
  var random = Math.floor(Math.random() * 10);
  const stateCategories = useSelector((state) => state.categories)
  const stateAllNFTs = useSelector((state) => state.allNFTs);
  


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
  }

 
  
    return(
        <React.Fragment>
          <Search></Search>
          <Slider {...settings} className="slider">
        {stateCategories.length > 0
          ? stateCategories.map((ele) => (
              <div className={`color${Math.floor(Math.random() * 10)}`}>
                <h4 className="text">{ele.name}</h4>
              </div>
            ))
          : null}
      </Slider>
          <Grid container spacing={6}  className={classes.gridContainer}>
              {
                  stateAllNFTs  ? stateAllNFTs.map(ele => {
                    return (
                      ele !== null && (
                        <div>
                          <Cards ele={ele} />
                        </div>
                      )
                    )

                  }) : <h1>Loading</h1>
              }
          </Grid>
        </React.Fragment>
    )
}