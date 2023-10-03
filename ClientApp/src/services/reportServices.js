import { path } from "../utils/http";

const urlReport = () => 
{

    return {
        certificate : id => `${path}certificate/Certificado-${id}`,        
        clase : id => `${path}certificate/clase-${id}`,        
        print : (url) =>  window.open(`${url}`,'_blank')
    }
    

}



export default urlReport;