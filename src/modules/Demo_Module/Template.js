import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import {
  IconButton,
  RaisedButton,
  Dialog
} from 'material-ui';

import { Link } from 'react-router-dom';

import Eye from 'material-ui/svg-icons/image/remove-red-eye';
import Edit from 'material-ui/svg-icons/image/edit';
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import Delete from 'material-ui/svg-icons/action/delete';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Content from 'material-ui/svg-icons/content/create';

import Demo_Module_Form from '../Demo_Module_Form';

const Template = ({
  // getters
  parties,
  createParty,
  // setters
  toggleCreateParty,
  // others
  filters: {
    convertDateToUserFriendly
  },
  // scss
  styles
}) => {
  return(
    <div className={styles['party-demo']}>
        <Dialog
          title="Create new party"
          modal={false}
          open={createParty}
        >
          <Demo_Module_Form />
        </Dialog>

        <RaisedButton onClick={() => toggleCreateParty(true)} label="Add new party" icon={<Content />} primary={true} />
        <Table multiSelectable>
          <TableHeader>
            <TableRow >
              <TableHeaderColumn>#</TableHeaderColumn>
              <TableHeaderColumn>Party ID</TableHeaderColumn>
              <TableHeaderColumn>Party name</TableHeaderColumn>
              <TableHeaderColumn>Start date</TableHeaderColumn>
              <TableHeaderColumn>End date</TableHeaderColumn>
              <TableHeaderColumn>Host</TableHeaderColumn>
              <TableHeaderColumn>Party Status</TableHeaderColumn>
              <TableHeaderColumn colSpan="3">Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              parties.map((party, i) => {
                const {
                  id,
                  name,
                  date: {
                    startDate,
                    endDate
                  },
                  host: {
                    name: hostName
                  },
                  status
                } = party;

                return (
                  <TableRow key={i}>
                    <TableRowColumn>{i + 1}</TableRowColumn>
                    <TableRowColumn>{id}</TableRowColumn>
                    <TableRowColumn>{name}</TableRowColumn>
                    <TableRowColumn>{convertDateToUserFriendly(startDate)}</TableRowColumn>
                    <TableRowColumn>{convertDateToUserFriendly(endDate)}</TableRowColumn>
                    <TableRowColumn>{hostName}</TableRowColumn>
                    <TableRowColumn>{status}</TableRowColumn>
                    <TableRowColumn colSpan="3">
                      <IconButton>
                        <Eye/>
                      </IconButton>

                      <Link to={`/party-demo-form/${id}`}>
                        <IconButton>
                          <Edit/>
                        </IconButton>
                      </Link>

                      <IconButton>
                        <CompareArrows/>
                      </IconButton>

                      <IconButton>
                        <ContentCopy/>
                      </IconButton>

                      <IconButton>
                        <Delete/>
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
    </div>
  )
}

export default Template;
