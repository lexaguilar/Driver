import moment from 'moment';

export const traslateDefault ={
    date : new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
    areaId: 0,
    observaction: '',
}

export const inPutProductDefault = {
    date : new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
}

export const outPutProductDefault = {
    ...inPutProductDefault
}


export const purchaseDefault = {
    areaId: 0,
    date : new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
    typeId:0,
    providerId: 0,
    observaction: '',
    rate : 0,
}

export const dataDefault = {
    name: '',
    identification: '',
    address: '',
    phoneNumber: '',
    startDate: new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
    subTotal: 0,
    discount: 0,
    total: 0,
    initBalance: 0,
    balance: 0,
    categoryOne: false,
    categoryTwo: false,
    categoryThree: false,
    typeLicenceId: undefined,
    instructorId: 1,
    observation: '',
    reference: ''
}

export const dataReceipt = { 
   
        date:new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0),
        observation:'',
        amount: 0,
        reference:''
    
}