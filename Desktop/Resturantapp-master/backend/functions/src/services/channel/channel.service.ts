import Service from '../service';
import generatePaginatorService from '../generator/paginator.service'

export class Channel extends Service {
  static __typename = 'channel';
  static paginator = generatePaginatorService(Channel);

  static presets = {
    default: {
      id: null,
      name: null,
      created_by: null
    }
  };

  static filterFieldsMap = {};

  static isFilterRequired = false;

  static searchableFields = [];

  static sortFields = ["id"];
};