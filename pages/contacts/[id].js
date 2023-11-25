import Layout from '../../components/layout';
import { getAllContactIds, getContactData } from '../../lib/data-contacts';

// define a getStaticProps() function to have next.js retrieve data to use for the dynamic page
// - this name is defined by next.js
export async function getStaticProps( { params } ) {
  const itemData = await getContactData(params.id);
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
  const paths = await getAllContactIds();
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
          <h5 className="card-subtitle mb-2 text-body-secondary">{itemData.meta_concat.first_name}</h5>
          <h5 className="card-subtitle mb-2 text-body-secondary">{itemData.meta_concat.last_name}</h5>
          <h5 className="card-subtitle mb-2 text-body-secondary">{itemData.meta_concat.phone_number}</h5>
        </div>
      </article>
    </Layout>
  );
}