import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import * as User from '../db-handlers/user/user-fetch';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
export const {
  nodeInterface: NodeInterface,
  nodeField: NodeField
} = nodeDefinitions(
  globalId => {
    var { type, id } = fromGlobalId(globalId);
    let modelType = null;
    switch (type) {
      case 'User':
        modelType = User;
        break;
      default:
        return null;
    }
    // TODO add the other objects once we have a way to manage permissions for getting these...
    return modelType.fetchById(id);
  },
  obj => {}
);
