import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Form from "../../components/Form";


const Update = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const axiosPublic = useAxios();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/allSites/${id}`);
                setData(response.data);
                console.log(response.data);

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [axiosPublic, id]);


    return (
        <div>
            <Form isUpdate={true} data={data} />
        </div>
    );
};

export default Update;