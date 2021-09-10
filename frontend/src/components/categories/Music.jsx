import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Cards from "../card/card.jsx"
import Grid from '@material-ui/core/Grid';
import Search from "../Search/Search.jsx"
import { getNFTs} from "../../actions/getNFTs.js";

const useStyles = makeStyles((theme) => ({
    
    gridContainer: {
      marginTop: "30px"
    }
  }));

export default function Music() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNFTs());
  }, [dispatch]);

  const stateAllNFTs = useSelector((state) => state.allNFTs);
  const filtered = stateAllNFTs.filter((i) => i.categories === "Music");

 
    const classes = useStyles();
    return(
        <React.Fragment>
          <Search></Search>
          <Grid container spacing={6}  className={classes.gridContainer}>
              {
                  filtered  ? filtered.map(ele => {
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