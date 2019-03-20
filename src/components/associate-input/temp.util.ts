import { IInterviewFormat } from '../../model/Interview.format.model';

const FORMATS: IInterviewFormat[] = [
    {
        id: 1,
        formatDesc: 'On Site'
    },
    {
        id: 2,
        formatDesc: 'In Person'
    },
    {
        id: 3,
        formatDesc: 'Video Call'
    },
    {
        id: 4,
        formatDesc: 'Phone Call'
    }
];

export const getFormatById = (id: number) => {
    return FORMATS[id];
};

export const getFormatNames = () => {
    let temp = ['<-select->'];
    FORMATS.forEach(e => {
        temp.push(e.formatDesc);
    });
    return temp;
};