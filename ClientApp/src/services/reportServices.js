import { path } from "../utils/http";

const urlReport = () => 
{

    return {
        certificate : id => `${path}certificate/Certificado-${id}`,        
        print : (url) =>  window.open(`${url}`,'_blank')
    }
    

}



export default urlReport;