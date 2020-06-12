export enum Types {
    TEXT = 'text',
    SINGLE_SELECT = 'single-select',
    MULTI_SELECT = 'multi-select',
    RADIO = 'radio',
    DATE = 'date'
}

export class Campaign {
name: string;
description: string;
startDate: Date;
endDate: Date;
campaignFields: CampaignField[];
workflow?: any;
}

export class CampaignField{
    name: string;
    type: Types;
    allowedValues: any[];
    defaultValue: any;
}

export class Workflow{
currentStage: string;
nextStage: string[];
prevStage: string[];
}

export class Idea{
    name: string;
    description: string;
    campaignValues: any[];
    postedOn: Date;
    submittedBy: any;
    contributors: any[];
    // workflow audit data structure
}
