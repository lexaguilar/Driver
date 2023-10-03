import React, { useEffect, useState, useRef } from 'react';
import Form, { Label, SimpleItem } from 'devextreme-react/form';
import Accordion from 'devextreme-react/accordion';
import { NumberBox } from 'devextreme-react/number-box';
import { useDispatch, useSelector } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas'
import { claseDialog } from '../../store/clases/claseReducer';
import http from '../../utils/http';
import urlReport from '../../services/reportServices';


  const CustomItem = (itemData) => {
    
   
    const [questions, setQuestions] = useState([]);
    const [data, setData] = useState({ observation: '', classDateTime: null, id: 0 });
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const refForm = useRef();
    const refCanvas = useRef();

    const { classId, clientId } = itemData.data;


    useEffect(() => {
       
            http(`clases/client/${clientId}/get/class/${classId}`).asGet().then(clases => {
                
                const questionsResult = clases.detail.map(item => {
                            
                    const current = clases.classDoit?.clientClassQuestions?.find(x => x.claseQuestionId === item.id);

                    if(current != undefined){
                        item.evaluation = current.evaluation;
                    }
                    
                    return item;

                });                

              
                setData({
                    observation: clases.classDoit?.observation,
                    classDateTime: clases.classDoit?.classDateTime,
                    signatureClient: clases.classDoit?.signatureClient,
                    id: clases.classDoit?.id
                })
                setQuestions(questionsResult);
                setTotal(questionsResult.reduce((a, b) => a + (b['evaluation'] || 0), 0));
                
                setLoading(false);

            });
       
    }, [classId, clientId]);

    return ( loading ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> 
            :           
            <div> 
                <table className='w-100'>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th align='right'>EVALUACIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            questions.map(item =>{
                                
                                const max = item.peso > 0 ? item.peso : 10;
                                const peso = item.peso > 0 ? `${item.peso} pts` : '';
                                
                                return (
                                    <tr key={item.id}>
                                        <td style={{width:'80%'}}><p className='font-15'>{item.name}</p></td>
                                        <td>{peso}</td>
                                        <td align='right'>
                                            <NumberBox width={80}
                                                readOnly={true}                                                
                                                max={max}
                                                min={0}
                                                defaultValue={0}
                                               
                                                value={item.evaluation}
                                            />
                                        </td>                                        
                                    </tr>   
                            )})
                        }
                       {questions.some(x => x.peso > 0) && <tr>
                            <td colSpan={2} align='right'>Total</td>
                            <td align='right'>{total}</td>
                        </tr>}
                        <tr>
                            <td colSpan={3}>
                                <Form formData={data} ref={refForm} colCount={4}>
                                    <SimpleItem dataField="observation" colSpan={3} editorOptions={{
                                        readOnly: true,
                                    }}>
                                        <Label text="Observation" />
                                    </SimpleItem>
                                    <SimpleItem dataField="classDateTime" editorType='dxDateBox' colSpan={1} 
                                        editorOptions={{openOnFieldClick:true, readOnly: true}} >
                                        <Label text="Fecha" />
                                    </SimpleItem>
                                </Form>
                            </td>
                           
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <img width={300} src={data.signatureClient} alt="" />
                            </td>
                        </tr>
                    </tbody>
                </table>                   
        </div>
    )

}

export const PlanClase = (props) => {

    console.log(props)

    let id = 0;
    id = props.location.state?.id || 0;

    const [clases, setClases] = useState([]);

    useEffect(() => {
        
        if(id > 0){
            http(`clases/client/${id}/get`).asGet().then(clases => {
                setClases(clases);
                
            });
        }
        
    }, [id]);

    const nombre = clases.length > 0 ? clases[0].clientName : '';
    
    const CustomTitle = (itemData) => {
        return (
            <h5 style={{fontSize:'14px'}}>
                {
                    itemData.hasClass == null ? 
                    <img width={22} src="data:image/png;base64,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" alt="" />
                    :
                    <img width={22} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEwMjguNCkiPjxwYXRoIGQ9Im0yMiAxMmMwIDUuNTIzLTQuNDc3IDEwLTEwIDEwLTUuNTIyOCAwLTEwLTQuNDc3LTEwLTEwIDAtNS41MjI4IDQuNDc3Mi0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3MiAxMCAxMHoiIGZpbGw9IiMyN2FlNjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMTAyOS40KSIvPjxwYXRoIGQ9Im0yMiAxMmMwIDUuNTIzLTQuNDc3IDEwLTEwIDEwLTUuNTIyOCAwLTEwLTQuNDc3LTEwLTEwIDAtNS41MjI4IDQuNDc3Mi0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3MiAxMCAxMHoiIGZpbGw9IiMyZWNjNzEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMTAyOC40KSIvPjxwYXRoIGQ9Im0xNiAxMDM3LjQtNiA2LTIuNS0yLjUtMi4xMjUgMi4xIDIuNSAyLjUgMiAyIDAuMTI1IDAuMSA4LjEyNS04LjEtMi4xMjUtMi4xeiIgZmlsbD0iIzI3YWU2MCIvPjxwYXRoIGQ9Im0xNiAxMDM2LjQtNiA2LTIuNS0yLjUtMi4xMjUgMi4xIDIuNSAyLjUgMiAyIDAuMTI1IDAuMSA4LjEyNS04LjEtMi4xMjUtMi4xeiIgZmlsbD0iI2VjZjBmMSIvPjwvZz48L3N2Zz4=" alt="" />
                }
                {itemData.clase}
            </h5>
          );
    }

    const printClass = () => {

        const report = urlReport();
        report.print(`${report.clase(id)}`);

    }

    return (
        <div className='container medium'>           
              <Accordion
                    dataSource={clases} 
                    itemTitleRender={CustomTitle}
                    itemComponent={CustomItem}
                    collapsible={true}
                    id="accordion-container"
                />
                <button  className="btn btn-outline-secondary" onClick={printClass} type="button">
                    Imprimir 
                </button>
        </div>
    );
}

export default PlanClase;
