import React, { useEffect,useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getProfileAdmin from "../../actions/getProfileAdmin"
import getClean from "../../actions/getClean"
import postCategorie from "../../actions/postCategorie"


export default function AdminProfile() {
   
  const dispatch = useDispatch();
  
  useEffect(() => {
    // dispatch(getProfileAdmin())
    return () => {
      dispatch(getClean())
    }
  }, [dispatch])
  //algo
  // const admin = useSelector((state) => state.profileAdmin)
  // console.log("Información del perfil desded el Reducer:", admin[0])

  const [categories,setCategories]=useState({})
  function onInputChange(e) {
    setCategories({
      [e.target.name]: e.target.value
    })
  }
  //ala
  async function handleSubmit(e) {
     e.preventDefault()
     console.log("cat",categories)
     dispatch(postCategorie(categories))
     alert('Category created')
     setCategories({name:""})
     
 }

  
  return ( <div>

           <h3>Bienvenido
              {/* {admin[0].firstName} */}
              </h3>
           {/* <img src={admin[0]? admin[0].image : "" /> */}
            
            <h3>Modify categories </h3>
            <h2>Add</h2>
            <label>Name</label>
            <input
            required
            type="text"
            name="name"
            placeholder="New category"
            onChange={(e)=>onInputChange(e)}
            />
            <button onClick={handleSubmit}>Create!</button>
        
            {/* <button>Create a new category</button>
            <button>Select an administrator</button>
            <button>Delete NFTs</button>
            <button>Change Fee price </button> */}

         
        </div>

        
        
  )
}
