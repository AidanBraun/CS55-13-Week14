import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/data';
import { getSortedContactList } from '../lib/data-contacts';
import { getSortedProductList } from '../lib/data-products';

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
  const allData = await getSortedList();
  const allContactData = await getSortedContactList();
  const allProductData = await getSortedProductList();
  
  return {
    props: { 
      allData,
      allContactData,
      allProductData
    },
    revalidate: 60
  };
}

// export our home page component Home
export default function Home( { allData, allContactData, allProductData } ) {
  return (
    <Layout home>
      <h1>List of Cool People</h1>
      <div className="list-group">
        {allData && allData.map(
            ({id, name}) => (
              <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action">
                {name}
              </Link>
            )
          )
        }
        <h1>List of Contacts</h1>
        {allContactData && allContactData.map(
            ({id, name}) => (
              <Link key={id} href={`/contacts/${id}`} className="list-group-item list-group-item-action">
                {name}
              </Link>
            )
          )
        }
        <h1>List of Products</h1>
        {allProductData && allProductData.map(
            ({id, name}) => (
              <Link key={id} href={`/products/${id}`} className="list-group-item list-group-item-action">
                {name}
              </Link>
            )
          )
        }
      </div>
    </Layout>
  );
}
