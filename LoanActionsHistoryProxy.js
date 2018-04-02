import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { getFullName } from './util';

class LoanActionsHistoryProxy extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    resources: PropTypes.shape({
      proxy: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
  }

  static manifest = Object.freeze({
    proxy: {
      type: 'okapi',
      path: 'users/!{id}',
    },
  });

  getUserFullName() {
    const proxy = (this.props.resources.proxy || {}).records || [];
    if (proxy.length === 1 && proxy[0].id === this.props.id) {
      return <Link to={`/users/view/${this.props.id}?query=${proxy[0].username}`} onClick={this.props.onClick}>{getFullName(proxy[0])}</Link>;
    }

    return this.props.id;
  }

  render() {
    if (this.props.id) {
      return <KeyValue label={this.props.stripes.intl.formatMessage({ id: 'ui-users.loans.details.proxyBorrower' })} value={this.getUserFullName()} />;
    }

    return <KeyValue label={this.props.stripes.intl.formatMessage({ id: 'ui-users.loans.details.proxyBorrower' })} value="-" />;
  }
}

export default LoanActionsHistoryProxy;
