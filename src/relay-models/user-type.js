import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { NodeInterface } from './node-definitions-type';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Application user',
  fields: () => ({
    id: globalIdField('User', obj => obj._id),
    full_name: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    primary_email: {
      type: GraphQLString
    },
    primary_locale: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),
  interfaces: [NodeInterface]
});

export const { connectionType: UserConnection } = connectionDefinitions({
  name: 'User',
  nodeType: UserType
});
