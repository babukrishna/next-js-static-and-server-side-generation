import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

const Sales = (props) => {
  const [sales, setSales] = useState(props.data);

  const { data, error } = useSWR(
    'https://next-js-e29a8-default-rtdb.firebaseio.com/sale.json'
  );
  
  useEffect(() => {
    if(data){
      let modifiedData = Object.keys(data).map( item =>({'id':item,'name':data[item].name,'value':data[item].value}));
      setSales(modifiedData);
    }
  },[data])

  /* useEffect( () => {
     fetch('https://next-js-e29a8-default-rtdb.firebaseio.com/sale.json')
     .then( response => response.json())
     .then(data => setSale(data))
  },[]); */

  if(error){
    return <p>Something went wrong</p>
  }

  if(!data && !sales){
    return <p>Loading.....</p>
  }

  return(
    <Fragment>
      <h1>Big Sale</h1>
      <ul>
        {
          sales.map( item => <li key={item.id}>{item.name} - {item.value}</li>)
        }
      </ul>
    </Fragment>
  )
}

export async function getStaticProps(){
  var modifiedData;
  await fetch('https://next-js-e29a8-default-rtdb.firebaseio.com/sale.json')
     .then( response => response.json())
     .then(data => {
        modifiedData = Object.keys(data).map( item =>({'id':item,'name':data[item].name,'value':data[item].value}));
     })

     return{
       props:{
         data:modifiedData
       }
     }
}

export default Sales;