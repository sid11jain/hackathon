import { Types, SearchType, ComparisonOperators, FILTER_TYPE, IdValuePair } from './common/common-utility.model';
export const CAMPAIGN_VALUES = 'campaignValues';
export const DEFAULT_CURRENT_STAGE = 'initiated';

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
    { filterName: 'currentStage' },
    {
      filterName: 'postedOnFrom',
      valueType: FILTER_TYPE.DATE,
      comparisonOp: ComparisonOperators.OP_GTE
    },
    {
      filterName: 'postedOnTo',
      valueType: FILTER_TYPE.DATE,
      comparisonOp: ComparisonOperators.OP_LTE
    }
  ];

export const COLUMN_NAME_COMMENTS_COUNT = 'commentsCount';
export const COLUMN_NAME_LIKES_COUNT = 'likesCount';
export const COLUMN_NAME_FAVOURITES_COUNT = 'favouritesCount';


export const COLUMN_NAME_COMMENTS = 'comments';
export const COLUMN_NAME_LIKES = 'likes';
export const COLUMN_NAME_FAVOURITES = 'favourites';
export const COMMENT_COLUMN_ID = 'comment';
export const USERNAME_COLUMN_ID = 'username';
export const COMMENTED_ON_COLUMN_ID = 'commentedOn';

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
    commentsCount: number;
    likes: any[];
    likesCount: number;
    favourites: any[];
    favouritesCount: number;
}

export class Filter {
  filterName: string;
  valueType = 'string';
  values: any[];
  expanded ? = false; // Used for expansion panel. Being excluded before sending final filters to server.
  nestedOn = true;
  searchType: SearchType = SearchType.EQUALS;
  comparisonOp: ComparisonOperators = ComparisonOperators.OP_EQ;
}
