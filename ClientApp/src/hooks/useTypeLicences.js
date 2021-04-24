import { useState,useEffect } from "react";
import http from "../utils/http";
import uri from "../utils/uri";

const useTypeLicences = () => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ typeLicences, setTypeLicences ] = useState([]);   

    const callApi = async () => {

        const data = await http(`catalogos/TypeLicence`).asGet();        

        setTypeLicences(data);
        setIsLoading(false);

    }
    
    useEffect(() => {
        callApi();
    }, [0]);

    return {
        typeLicences, 
        setTypeLicences,
        isLoading
    }

}

export default useTypeLicences;