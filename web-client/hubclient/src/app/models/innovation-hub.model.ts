export const CAMPAIGN_VALUES = 'campaignValues';
export const DEFAULT_CURRENT_STAGE = 'initiated';

export enum SearchType {
    EQUALS = 'equals',
    LIKE = 'like'
}

export enum ComparisonOperators {
    OP_LTE = 'LTE',
    OP_GT = 'GT',
    OP_GTE = 'GTE',
    OP_EQ = 'EQ',
    OP_NEQ = 'NEQ',
    OP_IN = 'IN',
    OP_NIN = 'NIN'
}

// Add valueType for date
export const IDEA_SEARCH_FILTERS = [
    {
        filterName: 'name',
        searchType: SearchType.LIKE
    },
    {
        filterName: 'tags',
        searchType: SearchType.LIKE
    },
    // { filterName: 'contributors' },
    { filterName: 'submittedBy' },
    { filterName: 'currentStage' }
];



export enum Collection {
    CAMPAIGN = 'campaign',
    IDEA = 'idea',
    USERS = 'users',
    WORKFLOW = 'workflow',
    TAGS = 'tags'
}
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

export class CampaignField {
    name: string;
    type: Types;
    allowedValues: any[];
    defaultValue: any;
    mandatroy: boolean;
    // Collection
}

export class Workflow {
    currentStage: string;
    nextStage: string[];
    prevStage: string[];
    description: string;
}

export class Idea {
    name: string;
    description: string;
    campaignName: string;
    campaignValues: any[];
    postedOn: Date;
    submittedBy: any;
    contributors: any[];
    tags: any[];
    currentStage: Workflow;
    campaign: Campaign;
    // workflow audit data structure
    comments: any[];
    likes: any[];
    likeCount: number;
    favourites: any[];
    favouritesCount: number;
}

export class Filter {
    filterName: string;
    valueType = 'string';
    values: any[];
    expanded ?= false;
    nestedOn ?= true;
    searchType: SearchType = SearchType.EQUALS;
    comparisonOp?: ComparisonOperators;
}
