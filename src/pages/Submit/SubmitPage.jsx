// import Form from "../../components/Form";



// const SubmitPage = () => {

//     return (
//         <div>
//             <div className="text-white text-center mt-5 md:mt-8 space-y-3">
//                 <h2 className="text-3xl md:text-4xl font-semibold">Submit Your Website for Listing</h2>
//                 <p className="font-light">Submit your website to be featured in our curated collection of top websites by category. <br /> Increase your visibility and reach a broader audience.</p>
//             </div>

//             <div>
//                 <Form header="Submit Your Website for Listing" suuHeader="Submit your website to be featured in our curated collection of top websites by category. 
//                 Increase your visibility and reach a broader audience." />
//             </div>
//         </div>
//     );
// };

// export default SubmitPage;

import Form from "../../components/Form";

const SubmitPage = () => {
  return (
    <div>
      <Form isUpdate={false} />
    </div>
  );
};

export default SubmitPage;
