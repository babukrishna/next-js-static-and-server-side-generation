import { Fragment } from "react/cjs/react.production.min";

const ProductDetail = (props) => {
  const { loadedProduct } = props;

  if(!loadedProduct){
    return <h2>Loading</h2>
  }

  return(
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.details}</p>
    </Fragment>
  )
}

const getData = async() =>{
  const fs = require('fs/promises');
  const path = require('path');
  const filePath = path.join(process.cwd(),'/data','/data.json');

  var jsonData = await fs.readFile(filePath);
  return jsonData = JSON.parse(jsonData);
}

export async function getStaticProps(context){
  const jsonData = await getData();

  const { params } = context;
  const productId = params.id;
  const product = jsonData.products.find( product => product.id === productId);

  if(!product){
    return{ notFound:true }
  }
  
  return{
    props:{
      loadedProduct:product
    }
  }
}

export async function getStaticPaths(){
  const jsonData = await getData();
  const ids = jsonData.products.map( item => item.id);
  const params = ids.map( item => ({params:{id:item}}));

  return{
    paths:params,
    fallback:true
  }
}

export default ProductDetail;