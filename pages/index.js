import Link from 'next/link';

const Home = (props) => {
  const { products } = props;
  
  return (
    <ul>
      {
        products.map( item => <li key={item.id}>
          {item.title} - <Link href={`/${item.id}`}> Click here for details</Link>
        </li>)
      }
    </ul>
  )
}

export async function getStaticProps(context) {
  const fs = require('fs/promises');
  const path = require('path');
  const filePath = path.join(process.cwd(),'/data','/data.json');

  var jsonData = await fs.readFile(filePath);
  jsonData = JSON.parse(jsonData);

  if(!jsonData.products){
    return{
      redirect:{
        destination:'/no-data'
      }
    }
  }
  
  if(jsonData.products.length === 0){
    return{
      notFound:true
    }
  }

  return {
    props: {
      products :jsonData.products
    },
    revalidate:10
  }
}

export default Home;