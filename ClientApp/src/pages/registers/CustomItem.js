import React ,{ useEffect, useState } from 'react';
import http from '../../utils/http';

const CustomItem = (itemData) => {

    //const [loading, setLoading] = useState(true);
    //const [data, setData] = useState({});

    // const loadData = async () => {

    //     const resp = await http(`clases/client/${itemData.clientId}/get/class/${itemData.classId}`).asGet()
    //     const { detail, classDoit } = resp;

    //     const result = detail.map(item => {

    //         const current = classDoit.find(x => x.classDoit === item.id);
            
    //         if(current != undefined){
    //             item.evaluation = current.evaluation;
    //             item.observation = current.observation;
    //         }

    //         return item;

    //     });
    //     setLoading(false);
    //     setData(result);

    // }

    // useEffect(() => {
    //     loadData();
    // }, [itemData]);

    return (
        <div>
            {
                //loading ?
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> 
                // :
                // <div>
                //     <table>
                //         <thead>
                //             <tr>
                //                 <th></th>
                //                 <th>EVAL</th>
                //                 <th>OBSERVACIÓN</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {
                //                 data.map(item => (
                //                     <tr key={item.id}>
                //                         <td>{item.name}</td>
                //                         <td>{item.evaluation}</td>
                //                         <td>{item.observation}</td>
                //                     </tr>   
                //                 ))
                //             }
                //         </tbody>
                //     </table>
                //     <button type="button">Guardar</button>
                // </div>
            }
        </div>
    );
}

export default CustomItem;
