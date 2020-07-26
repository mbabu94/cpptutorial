import Service from '../service';

export class JqlSubscription extends Service {
  static __typename = 'jqlSubscription';
  
  static presets = {
    default: {
      id: null,
    }
  };

  static filterFieldsMap = {
  };

  static isFilterRequired = false;

  static searchableFields = [];

  static sortFields = [];
};