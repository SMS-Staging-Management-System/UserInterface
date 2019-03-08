
export interface IInterviewFormat {
    id: number;
    description: string;
}

export interface IAssociateInput {
    id?: number;
    dateNotified: Date;
    dayNotice: boolean;
    descriptionProvided: boolean;
    interviewFormat: IInterviewFormat | undefined;
    proposedFormat: IInterviewFormat | undefined;
}