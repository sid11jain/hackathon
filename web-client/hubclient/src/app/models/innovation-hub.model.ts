export enum Types {
    TEXT = 'text',
    SINGLE_OPTION = 'single-option',
    MULTI_OPTION = 'multiple-option',
    RADIO = 'radio',
    DATE = 'date',
    DOCUMENT = 'doc'
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
    // Collection
}

export class Workflow{
currentStage: string;
nextStage: string[];
prevStage: string[];
}

export class Idea{
    name: string;
    description: string;
    campaignName: string;
    campaignValues: any[];
    postedOn: Date;
    submittedBy: any;
    contributors: any[];
    // workflow audit data structure
}
