import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const columns = [
  {
    id: "id",
    label: "ID",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "lastName",
    label: "Last",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "firstName",
    label: "First",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "country",
    label: "Country",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "room",
    label: "Room",
    minWidth: 170,
    align: "right",
  },
  {
    id: "checkedIn",
    label: "Checked In?",
    minWidth: 170,
    align: "right",
  },
  {
    id: "dateIn",
    label: "Date In",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "dateOut",
    label: "Date Out",
    minWidth: 170,
    npalign: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 170,
    align: "right",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "tab",
    label: "Tab",
    minWidth: 170,
    align: "right",
  },
  {
    id: "paid",
    label: "Paid?",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function GuestRow(props) {
  const [open, setOpen] = React.useState(false);
  const row = props.row,
    i = props.i;
  let id = row.id;
  console.log(`${row.firstName} ${row.lastName}`);
  console.log(`${row.room}: ${row.rent}`);
  row.activities.forEach((activity) =>
    console.log(`${activity.title}: ${activity.cost}`)
  );
  row.purchases.forEach((purchase) =>
    console.log(`${purchase.name}: ${purchase.cost}`)
  );

  row.id = i + 1;
  return (
    <>
      <TableRow role="checkbox" tabIndex={-1} key={row.id}>
        {columns.map((column) => {
          const value = row[column.id];
          return column.id === "id" ? (
            <TableCell key={column.id} align={column.align}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setOpen(!open);
                  console.log(open);
                }}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <IconButton
                onClick={() =>
                  props.open("Update", {
                    firstName: row.firstName,
                    lastName: row.lastName,
                    country: row.country,
                    roomId: row.roomId,
                    dateIn: row.dateIn,
                    dateOut: row.dateOut,
                    id: id,
                  })
                }
              >
                <EditIcon />
              </IconButton>
            </TableCell>
          ) : (
            <TableCell key={column.id} align={column.align}>
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Ledger
              </Typography>
              <Table size="small" aria-label="expenses">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      Room
                    </TableCell>
                    <TableCell>{row.room}</TableCell>
                    <TableCell align="right">$ {row.rent}</TableCell>
                  </TableRow>
                  {row.activities.map((activity, j) => (
                    <TableRow key={activity._id + j}>
                      <TableCell component="th" scope="row">
                        Activity
                      </TableCell>
                      <TableCell>{activity.title}</TableCell>
                      <TableCell align="right">$ {activity.cost}</TableCell>
                    </TableRow>
                  ))}
                  {row.purchases.map((purchase, k) => (
                    <TableRow key={purchase._id + k}>
                      <TableCell component="th" scope="row">
                        Store
                      </TableCell>
                      <TableCell>{purchase.name}</TableCell>
                      <TableCell align="right">$ {purchase.cost}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow key={id + 1}>
                    <TableCell component="th" scope="row">
                      Total
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell align="right">{row.tab}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function GuestTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(props.rows);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="guest table">
          <TableHead>
            <TableRow style={{ color: "black" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: "black",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return <GuestRow row={row} i={i} open={props.open} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
