import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import { makeSelectProsCons, makeSelectLoad, makeSelectProsConsCopy } from './selectors';
import { makeSelectUserId, makeSelectGroupId } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { getProsCons, editProsCons } from './actions';
import injectSaga from '../../utils/injectSaga';

import ListItem from '../../components/ListItem';
import Loader from '../../components/Loader';

class Home extends Component {
  state = {
    editable: {
      pros: false,
      cons: false,
    },
    inputs: {
      pros: '',
      cons: '',
    },
    editableIndex: null,
  };

  componentDidMount() {
    this.getProsCons();
  }

  getProsCons() {
    let { userId, groupId } = this.props;
    this.props.getProsCons({
      userId,
      groupId,
    });
  };

  inputChangedHandler = (key, val) => {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [key]: val,
      },
    });

    if(this.state.inputs[key].length === 1){
      this.setState({
        editable: {
          ...this.state.inputs,
          [key]: false,
        },
      });
    }
  };

  removeItem = target => {
    const { prosCons, editProsCons, userId, groupId } = this.props;
    let newData = Object.assign({}, prosCons);
    newData[target.type].splice(target.index, 1);

    editProsCons({
        newData,
        user: {
          userId,
          groupId,
        },
      },
    );
  };

  addItem = target => {
    const { prosCons, editProsCons, userId, groupId } = this.props;
    let newData = Object.assign({}, prosCons);
    newData[target.target].push(target.value);

    editProsCons({
      newData,
      user: {
        userId,
        groupId,
      },
    });
    this.setState({
      editable: {
        ...this.state.editable,
        [target.type]: false,
      },
      inputs: {
        ...this.state.inputs,
        [target.type]: '',
      },
    });
  };

  makeEditItem = target => {
    this.setState({
      editable: {
        ...this.state.editable,
        [target.type]: true,
      },
      inputs: {
        ...this.state.inputs,
        [target.type]: target.value,
      },
      editableIndex: target.index,
    });
  };

  editItem = target => {
    const { editProsCons, userId, groupId, prosCons } = this.props;
    const { editableIndex } = this.state;

    let newData = Object.assign({}, prosCons);
    newData[target.type][editableIndex] = target.value;

    editProsCons({
      newData,
      user: {
        userId,
        groupId,
      },
    });

    this.setState({
      editable: {
        ...this.state.editable,
        [target.type]: false,
      },
      inputs: {
        ...this.state.inputs,
        [target.type]: '',
      },
    });
  };

  render() {
    let { prosCons } = this.props;
    let { inputs, editable } = this.state;

    if (!prosCons) {
      return <div className="main loading">
        <Loader/>
      </div>;
    }

    return (
      <main className="main">
        <div className="container">
          <ul className="list">
            <h3 className="list__title">Pros</h3>
            {
              prosCons.pros.map((item, index) =>
                <ListItem key={index}
                          index={index}
                          text={item}
                          type='pros'
                          removeItem={this.removeItem}
                          makeEditItem={this.makeEditItem}
                />)
            }
          </ul>
          <ul className="list">
            <h3 className="list__title">Cons</h3>
            {
              prosCons.cons.map((item, index) => <ListItem
                key={index}
                index={index}
                type="cons"
                text={item}
                removeItem={this.removeItem}
                makeEditItem={this.makeEditItem}
              />)
            }
          </ul>
        </div>
        <div className="container">
          <label className="label">
            <input
              className="input"
              type="text"
              placeholder="Add pros"
              value={inputs.pros ? inputs.pros : ''}
              onChange={(e) => this.inputChangedHandler('pros', e.target.value)}/>
            <button className="btn" disabled={!inputs.pros}
                    onClick={
                      !editable.pros ? () => this.addItem({ target: 'pros', value: inputs.pros })
                        : () => this.editItem({ type: 'pros', value: inputs.pros })
                    }>
              <i className={!editable.pros ? 'fa fa-plus' : 'fa fa-edit'}/>
            </button>
          </label>
          <label className="label">
            <input
              className="input"
              type="text"
              placeholder="Add cons"
              value={inputs.cons ? inputs.cons : ''}
              onChange={(e) => this.inputChangedHandler('cons', e.target.value)}/>
            <button className="btn" disabled={!inputs.cons}
                    onClick={
                      !editable.cons ? () => this.addItem({ target: 'cons', value: inputs.cons })
                        : () => this.editItem({ type: 'cons', value: inputs.cons })
                    }>
              <i className={!editable.cons  ? 'fa fa-plus' : 'fa fa-edit'}/>
            </button>
          </label>
        </div>
      </main>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoad(),
  userId: makeSelectUserId(),
  groupId: makeSelectGroupId(),
  prosCons: makeSelectProsCons(),
  prosConsCopy: makeSelectProsConsCopy(),
});

const mapDispatchToProps = dispatch => ({
  getProsCons: data => dispatch(getProsCons(data)),
  editProsCons: data => dispatch(editProsCons(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homeReducer', reducer });
const withSaga = injectSaga({ key: 'homeSaga', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Home);
