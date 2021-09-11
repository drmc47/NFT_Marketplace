import Cards from '../card/card.jsx'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNFTs } from '../../actions/getNFTs.js'
import style from '../collectionhome/collectionhome.module.css'

export default function ColectionHome() {
  const stateAllNFTs = useSelector((state) => state.allNFTs)
  const selected = stateAllNFTs.slice(14, 20)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNFTs())
  }, [dispatch])

  return (
    <div className={style.houselists}>
      {selected.length > 0
        ? selected.map((ele) => (
            <div className={style.house}>
              <Cards ele={ele} />
            </div>
          ))
        : null}
    </div>
  )
}
