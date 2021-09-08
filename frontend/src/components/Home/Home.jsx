import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTs } from "../../actions/getNFTs.js";
import style from "../Home/Home.module.css";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import sortByAbc from "../../actions/sortByAbc";
import { sortByPrice } from "../../actions/sortByPrice";
import { filterByCategories } from "../../actions/filterCategorie";
import CollectionHome from "../collectionhome/collectionhome.jsx"
import Cards from "../card/card.jsx"
import Grid from '@material-ui/core/Grid';

export default function Home() {
  const filters = useSelector((state) => state.filters);
  const stateAllNFTs = useSelector((state) => state.allNFTs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNFTs());
    return () => {
      dispatch(getNFTs());
    };
  }, [dispatch]);

  const filterAscDesc = (e) => {
    e.preventDefault()
    dispatch(sortByAbc(e.target.value))
  }

  const filterByPrice = (e) => {
    e.preventDefault();
    dispatch(sortByPrice(e.target.value));
  };

  const handleCategorie = (e) => {
    dispatch(filterByCategories(e.target.value));
  };

  return (
    <div>
      <div
        className={style.back1}
      >
        <div className={style.container}>
          <Grid container spacing={6}>
          <div className={style.title}
          ><h1>Explore The NFTs Universe</h1></div>
          <CollectionHome/>
          </Grid>
          {/* <Search /> */}
          <label htmlFor="">Filters/ Orders</label>
          {/* //ORDENAR POR ABC */}
          <select onChange={(e) => filterAscDesc(e)}>
            <option value="">Asc-Desc</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
          <select onChange={(e) => handleCategorie(e)}>
            <option value="All">All</option>
            {filters &&
              filters.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
          </select>
          <select onChange={(e) => filterByPrice(e)}>
            <option value="all">Price</option>
            <option value="max">Max</option>
            <option value="min">Min</option>
          </select>

          <Grid container spacing={6}>
            {stateAllNFTs.length > 0 ? (
              stateAllNFTs.map((ele) => (
                <div>
                  <Link to={`nft/${ele._id}`}>
                    <Cards ele={ele} />
                  </Link>
                </div>
              ))
            ) : (
              <p>loading...</p>
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
}
