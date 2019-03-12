import { InterviewFormat } from '../../model/Interview.format.model';

const FORMATS: InterviewFormat[] = [
    {
        interviewFormatId: 1,
        formatDesc: 'On Site'
    },
    {
        interviewFormatId: 2,
        formatDesc: 'In Person'
    },
    {
        interviewFormatId: 3,
        formatDesc: 'Video Call'
    },
    {
        interviewFormatId: 4,
        formatDesc: 'Phone Call'
    }
];

export const getFormatById = (id: number) => {
    return FORMATS[id];
};

export const getFormatNames = () => {
    let temp = [ '<-select->' ];
    FORMATS.forEach(e => {
        temp.push(e.formatDesc);
    });
    return temp;
};