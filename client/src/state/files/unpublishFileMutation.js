import { graphql } from 'react-apollo';
import createPublicationMutation from './createPublicationMutation';

const { mutation, config } = createPublicationMutation('unpublishFile', 'UNPUBLISH');

export { mutation, config };
export default graphql(mutation, config);
