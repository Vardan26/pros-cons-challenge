import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../assets/styles/main.scss';

import { compose } from 'redux';
import HomePage from '../Home';
import NotFoundPage from '../NotFoundPage';

import injectSaga from '../../utils/injectSaga';

import { loadGroupId, loadUserId } from './actions';

import saga from './saga';
import {
  makeSelectUserId,
  makeSelectGroupId,
  makeSelectLoad,
} from './selectors';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import injectReducer from '../../utils/injectReducer';
import reducer from '../Home/reducer';

class App extends Component {
  componentDidMount() {
    this.props.loadUserId();
    this.props.loadGroupId();
  }

  render() {
    const { userId, groupId } = this.props;
    let Home;
    {
      userId && groupId ? Home = HomePage : <div>loading...</div>;
    }

    return (
      <>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="" component={NotFoundPage}/>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoad(),
  userId: makeSelectUserId(),
  groupId: makeSelectGroupId(),
});

const mapDispatchToProps = dispatch => ({
  loadUserId: () => dispatch(loadUserId()),
  loadGroupId: () => dispatch(loadGroupId()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'appReducer', reducer });
const withSaga = injectSaga({ key: 'appSaga', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(App);
