/**Combines resolver functions into one resolver in a first-result-returns manner:
 * all resolvers will be called sequentially with the same initial arguments
 * until one resolves to something other than undefined; when that happens,
 * the resolved value will be returned and the remaining resolver functions will be ignored.
 * skip : undefined
 *
 */
import { ForbiddenError } from "apollo-server";

// skip is undefined , combineResolvers combine multiple resolvers
import { combineResolvers, skip } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

// if the firest resolver return undefined it will continue executing the resolvers
export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin.")
);

export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findById(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }

  return skip;
};
