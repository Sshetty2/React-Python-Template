import React from 'react';
// react component for creating dynamic tables
import ReactTable from 'react-table';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import Assignment from '@material-ui/icons/Assignment';
import Dvr from '@material-ui/icons/Dvr';
import Favorite from '@material-ui/icons/Favorite';
import Close from '@material-ui/icons/Close';
// core components
import GridContainer from './components/Grid/GridContainer.jsx.js.js.js';
import GridItem from './components/Grid/GridItem.jsx.js.js.js';
import Button from './components/CustomButtons/Button.jsx.js.js.js';
import Card from './components/Card/Card.jsx.js.js.js';
import CardBody from './components/Card/CardBody.jsx.js.js.js';
import CardIcon from './components/Card/CardIcon.jsx.js.js.js';
import CardHeader from './components/Card/CardHeader.jsx.js.js.js';

import { dataTable } from '../sampleReactTableData.js';

// import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx';

const grayColor = [
  '#999',
  '#777',
  '#3C4858',
  '#AAAAAA',
  '#D2D2D2',
  '#DDD',
  '#555555',
  '#333',
  '#eee',
  '#ccc',
  '#e4e4e4',
  '#E5E5E5',
  '#f9f9f9',
  '#f5f5f5',
  '#495057',
  '#e7e7e7',
  '#212121',
  '#c8c8c8',
  '#505050'
];

const title = {
  color: grayColor[2],
  textDecoration: 'none',
  fontWeight: '300',
  marginTop: '30px',
  marginBottom: '25px',
  minHeight: '32px',
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  '& small': {
    color: grayColor[1],
    fontSize: '65%',
    fontWeight: '400',
    lineHeight: '1'
  }
};

const cardTitle = {
  ...title,
  marginTop: '0',
  marginBottom: '3px',
  minHeight: 'auto',
  '& a': {
    ...title,
    marginTop: '.625rem',
    marginBottom: '0.75rem',
    minHeight: 'auto'
  }
};


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
  }
};

class ReactTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataTable.dataRows.map((prop, key) => {
        return {
          id: key,
          name: prop[0],
          position: prop[1],
          office: prop[2],
          age: prop[3],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked LIKE button on \n{ \nName: " +
                      obj.name +
                      ', \nposition: ' +
                      obj.position +
                      ', \noffice: ' +
                      obj.office +
                      ', \nage: ' +
                      obj.age +
                      '\n}.'
                  );
                }}
                color="info"
                className="like"
              >
                <Favorite />
              </Button>{' '}
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                      obj.name +
                      ', \nposition: ' +
                      obj.position +
                      ', \noffice: ' +
                      obj.office +
                      ', \nage: ' +
                      obj.age +
                      '\n}.'
                  );
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>{' '}
              {/* use this button to remove the data row */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>{' '}
            </div>
          )
        };
      })
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>React Table</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.data}
                filterable
                columns={[
                  {
                    Header: 'Name',
                    accessor: 'name'
                  },
                  {
                    Header: 'Position',
                    accessor: 'position'
                  },
                  {
                    Header: 'Office',
                    accessor: 'office'
                  },
                  {
                    Header: 'Age',
                    accessor: 'age'
                  },
                  {
                    Header: 'Actions',
                    accessor: 'actions',
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ReactTables);
