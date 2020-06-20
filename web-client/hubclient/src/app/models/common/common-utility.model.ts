export class SelectOptionConfig {
    multipleOptions: boolean;
    searchable: boolean;
    clearable: boolean;
    bindValue?: any;
    bindLabel?: any;
}

export class IdValuePair{
    id: any;
    value: any;
}

export enum OPERATION{
    ADD = 'add',
    EXPORT = 'export',
    VIEW = 'view'
}

export enum FILTER_TYPE{
    STRING = 'string'
}

export const DATE_FORMAT = 'dd-MM-yyyy';
