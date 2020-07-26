import Service from '../service';
import generatePaginatorService from '../generator/paginator.service'

import errorHelper from '../../helpers/tier0/error';
import resolverHelper from '../../helpers/tier2/resolver';

import { Channel } from '../services'

export class Post extends Service {
  static __typename = 'post';

  static presets = {
    default: {
      id: null,
      message: null,
      channel: {
        name: null
      },
    }
  };

  static filterFieldsMap = {
    "channel.name": {
      field: "channel",
      foreignField: "name"
    }
  };

  static isFilterRequired = false;

  static searchableFields = [];

  static sortFields = ["id", "date_created"];

  static paginator = generatePaginatorService(Post);

  static async addRecord(req, args = <any> {}, query?: object) {
    if(!req.user) throw errorHelper.loginRequiredError();

    //channel_name required
    if(!args.channel_name) throw errorHelper.missingParamsError();

    //if it does not pass the access control, throw an error
    if(!await this.testPermissions('add', req, args, query)) {
      throw errorHelper.badPermissionsError();
    }

    //check if channel_name exists
    const channelResults = await resolverHelper.resolveTableRows(Channel.__typename, this, req, {
      select: {
        id: null,
      },
      where: [
        {
          fields: {
            name: { value: args.channel_name },
          }
        }
      ]
    }, args);

    let channelId;

    if(channelResults.length < 1) {
      //not exists, add the channel
      const addChannelResults = await resolverHelper.addTableRow(Channel.__typename, {
        name: args.channel_name,
        created_by: req.user.id
      });
      channelId = addChannelResults.id;
    } else {
      channelId = channelResults[0].id;
    }

    const addResults = await resolverHelper.addTableRow(this.__typename, {
      ...args,
      channel: channelId,
      created_by: req.user.id
    });

    return this.getRecord(req, { id: addResults.id }, query);
  }

};