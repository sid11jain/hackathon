export class SelectOptionConfig {
  multipleOptions: boolean;
  searchable: boolean;
  clearable: boolean;
  bindValue?: any;
  bindLabel?: any;
}


export class NameIdValuePair{
    name: any;
    idValuePair: IdValuePair;
}

export class IdValuePair{
    id: any;
    value: any;
}

export enum OPERATION {
  ADD = 'add',
  EXPORT = 'export',
  VIEW = 'view'
}

export enum FILTER_TYPE {
  STRING = 'string',
  DATE = 'date'
}

export const DATE_FORMAT = 'dd-MM-yyyy';

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
