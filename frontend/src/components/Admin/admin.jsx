import React, { useEffect,useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getProfileAdmin from "../../actions/getProfileAdmin"
import getClean from "../../actions/getClean"
import postCategorie from "../../actions/postCategorie"
import { getCategories } from '../../actions/getCategories'
import {deleteCategory} from '../../actions/deleteCategory'


export default function AdminProfile() {
   
  const dispatch = useDispatch();
  
  const categoriesDB=useSelector(state=>state.categories)
  
  useEffect(() => {
    dispatch(getCategories())
    // dispatch(getProfileAdmin())
    // return () => {
    //   dispatch(getClean())
    // }
  }, [dispatch])
  //algo
  // const admin = useSelector((state) => state.profileAdmin)
  // console.log("Información del perfil desded el Reducer:", admin[0])

  const [inputs,setInputs]=useState({})

  function onInputChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  
  async function handleSubmit(e) {
     e.preventDefault()
     const category ={name:inputs.nameCategory}
     dispatch(postCategorie(category))
     alert('Category created')
     dispatch(getCategories())
     setInputs({nameCategory:""})
     
 }
 async function handleDelete(e) {
  e.preventDefault()
  dispatch(deleteCategory(inputs.deleteCategory))
  alert('Category deleted')
  dispatch(getCategories())
  setInputs({deleteCategory:""})
  
}

  
  return ( <div>

           <h3>Bienvenido
              {/* {admin[0].firstName} */}
              </h3>
           {/* <img src={admin[0]? admin[0].image : "" /> */}
            
            <h3>Modify categories </h3>
            <h4>Add</h4>
            <label>Name</label>
            <input
            required
            type="text"
            name="nameCategory"
            placeholder="New category"
            value={inputs.nameCategory}
            onChange={(e)=>onInputChange(e)}
            />
            <button onClick={handleSubmit}>Create!</button>

            <form onSubmit={(e)=>handleDelete(e)}>
            <h4>Delete</h4>
            <label htmlFor="">Categories</label> 
            <select required name="deleteCategory" onChange={(e)=>onInputChange(e)} defaultValue="">
            <option value="">Choose categories</option>
            {categoriesDB.map((cat)=>(
                <option key={cat._id} name={cat.name} value={cat._id}>{cat.name?.charAt(0).toUpperCase()+cat.name?.slice(1)}</option>
            ))}
           </select>
           <button type="submit">Delete!</button>
            </form>
   
            {/* <button>Select an administrator</button>
            <button>Delete NFTs</button>
            <button>Change Fee price </button> */} 

         
        </div>

        
        
  )
}
