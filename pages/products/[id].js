import Layout from '../../components/layout';
import { getAllProductIds, getProductData } from '../../lib/data-products';

// define a getStaticProps() function to have next.js retrieve data to use for the dynamic page
// - this name is defined by next.js
export async function getStaticProps( { params } ) {
  const itemData = await getProductData(params.id);
  //console.log("This is in ID " + itemData.meta_concat);
  return {
    props: {
      itemData
    }
  };
}

// define a getStaticPaths() function to tell next.js all valid URLs: 1,2,3,4 
// - this name is defined by next.js
export async function getStaticPaths() {
  const paths = await getAllProductIds();
  return {
    paths,
    fallback: false
  };
}

// export our dynamically routed page component Entry
export default function Entry( { itemData } ) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h4 className="card-title">{itemData.post_title}</h4>
          <h5 className="card-subtitle mb-2 text-body-secondary">{itemData.meta_concat.product_name}</h5>
          <h5 className="card-subtitle mb-2 text-body-secondary">{itemData.meta_concat.product_price}</h5>
          <h5 className="card-subtitle mb-2 text-body-secondary">{itemData.meta_concat.product_description}</h5>
        </div>
      </article>
    </Layout>
  );
}