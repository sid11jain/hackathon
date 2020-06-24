import { Type } from 'class-transformer';

export enum Users {
  USERNAME = 'username',
  ROLES = 'roles',
  TOKEN = 'token',
}

export enum Roles{
  ADMIN= 'ADMIN',
  BUSINESS= 'BUSINESS'
}

export class SelectOptionConfig {
  multipleOptions: boolean;
  searchable: boolean;
  clearable: boolean;
  bindValue?: any;
  bindLabel?: any;
  addTags?: boolean;
  addTagText?: string;
}


export class IdValuePair{
    id: any;
    value: any;
    constructor(id: any, value: any){
      this.id = id;
      this.value = value;
    }

}

export enum OPERATION {
  ADD = 'add',
  EXPORT = 'export',
  VIEW = 'view',
}

export enum FILTER_TYPE {
  STRING = 'string',
  DATE = 'date',
}

export const DATE_FORMAT = 'yyyy-MM-dd';

export enum SearchType {
  EQUALS = 'equals',
  LIKE = 'like',
}

export enum ComparisonOperators {
  OP_LTE = 'LTE',
  OP_GT = 'GT',
  OP_GTE = 'GTE',
  OP_EQ = 'EQ',
  OP_NEQ = 'NEQ',
  OP_IN = 'IN',
  OP_NIN = 'NIN',
}

// // Add valueType for date
// export const IDEA_SEARCH_FILTERS = [
//   {
//     filterName: 'name',
//     searchType: SearchType.LIKE,
//   },
//   {
//     filterName: 'tags',
//     searchType: SearchType.LIKE,
//   },
//   // { filterName: 'contributors' },
//   { filterName: 'submittedBy' },
//   { filterName: 'currentStage' },
//   {
//     filterName: 'postedOnFrom',
//     valueType: FILTER_TYPE.DATE,
//     comparisonOp: ComparisonOperators.OP_GTE,
//   },
//   {
//     filterName: 'postedOnTo',
//     valueType: FILTER_TYPE.DATE,
//     comparisonOp: ComparisonOperators.OP_LTE,
//   },
// ];

export enum Collection {
  CAMPAIGN = 'campaign',
  IDEA = 'idea',
  USERS = 'users',
  WORKFLOW = 'workflow',
  TAGS = 'tags',
  FILTERS = 'filters'
}
export enum Types {
  TEXT = 'text',
  SINGLE_OPTION = 'single-option',
  MULTI_OPTION = 'multiple-option',
  RADIO = 'radio',
  DATE = 'date',
  DOCUMENT = 'doc',
}

export const TypeDisplay = [
  {
    id: Types.SINGLE_OPTION,
    value: 'One'
  },
  {
    id: Types.MULTI_OPTION,
    value: 'Many'
  },
  {
    id: Types.TEXT,
    value: 'Any'
  }
];
