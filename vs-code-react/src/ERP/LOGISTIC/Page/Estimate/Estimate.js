//2020.08.25 태윤 쯔쯔
//@@@@@@@@@@@@@@@@@@@@@@
import React from "react";

import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import {
  makeStyles,
  lighten,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Toolbar,
  Typography,
  Checkbox,
  TableSortLabel,
  Tooltip, FormControl
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.8),
    },
  },
  page: {
    width: "100%",
  },
  container: {
    maxHeight: 200,
  },
  bgColor: {
    background: "#639dff",
    minWidth: 750,
  },
  title: {
    flex: "1 1 100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

// const ColorButton = withStyles(theme => ({
//   root: {
//     color: theme.palette.getContrastText(yellow[500]),
//     backgroundColor: yellow[500],
//     "&:hover": {
//       backgroundColor: yellow[700],
//     },
//   },
// }))(Button);
//=========================임시 파일 ===============

const columns = [
  { id: "estimateNo", label: "견적일련번호", minWidth: 170 },
  { id: "customerCode", label: "거래처코드", minWidth: 100 },
  {
    id: "estimateDate",
    label: "견적일자",
    minWidth: 100,
    align: "right",
  },
  {
    id: "contractState",
    label: "수주여부",
    minWidth: 100,
    align: "right",
  },
  {
    id: "estimateRequester",
    label: "견적요청자",
    minWidth: 100,
    align: "right",
  },
  {
    id: "effectiveDate",
    label: "유효일자",
    minWidth: 100,
    align: "right",
  },
  {
    id: "personCodeInCharge",
    label: "견적담당자코드",
    minWidth: 100,
    align: "right",
  },
  {
    id: "description",
    label: "설명",
    minWidth: 100,
    align: "right",
  },
];

function createData(
  estimateNo,
  estimateDate,
  contractState,
  estimateRequester,
) {
  return {
    estimateNo,
    estimateDate,
    contractState,
    estimateRequester,
  };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
];

//===============임시 파일 =============

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.bgColor}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            견적상세
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

//=========================================

const Estimate = ({ searchEstimateCode, EstimaterowData, date }) => {

  const classes = useStyles();
  const [startDate, setstartDate] = React.useState(new Date().toDateString());
  const [endDate, setendDate] = React.useState(new Date().toDateString());
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dateSearchCondition, setdateSearchCondition] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const handleStartChange = event => {
    setstartDate({
      ...date,
      [event.target.name]: event.target.value
    });
  }

  const handleEndChange = event => {
    setendDate({
      ...date,
      [event.target.name]: event.target.value
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleRadioChange = event => {
    setdateSearchCondition(event.target.value);
  };
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  console.log("에스티rowDatarowDatarowDatarowDatarowData메이트", EstimaterowData);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  //견적조회 및 견적상세 조회
  const handleClickOpen = Comparing => {
    console.log("스위치", Comparing);
    console.log("제발좀 나와라 ::", startDate["startDate"]);
    switch (Comparing) {
      case "searchEstimateData":
        searchEstimateCode({
          type: Comparing,
          startDate: startDate["startDate"],
          endDate: endDate["endDate"],
          dateSearchCondition: dateSearchCondition,

        });

        break;
      //견적상세 조회는 만들지 말지 고민중

      case "searchEstimateDetail":
        searchEstimateCode({
          type: Comparing,
          startDate: startDate,
          endDate: endDate,
        });

        break;

      default:
        break;
    }
  };
  /*
   
  */
  return (
    <div>
      <div>
        <FormControl style={{ minWidth: "450px" }}>
          <RadioGroup
            row
            aria-label="position"
            value={dateSearchCondition}
            onChange={handleRadioChange}
          >
            <fieldset>
              <legend>
                <strong>기준일</strong>
              </legend>
              <FormControlLabel
                value="estimateDate"
                control={<Radio />}
                label="견적일자"
              />
              <FormControlLabel
                value="effectiveDate"
                control={<Radio />}
                label="유효일자"
              />
            </fieldset>

            <form className={classes.container} noValidate>
              <TextField label="시작일" name="startDate" type={"date"} onChange={handleStartChange} />
            </form>
            <form>
              <TextField label="종료일" name="endDate" type={"date"} onChange={handleEndChange} />
            </form>



            <div className={classes.root}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => handleClickOpen("searchEstimateData")}
                value="searchEstimate"
              >
                견적조회
            </Button>
              <Button size="large" variant="contained" color="primary">
                PDF 출력/저장
            </Button>
              <Button size="large" variant="contained" color="primary">
                메일로 보내기
            </Button>
            </div>
          </RadioGroup>
        </FormControl>
      </div>

      {/**=====================테이블 화면 ============================== */}
      <Toolbar>
        <Typography className={classes.title} variant="h4">
          견 적
        </Typography>
      </Toolbar>
      <Paper className={classes.page}>
        <TableContainer className={classes.container}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    className={classes.bgColor}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>

              {EstimaterowData.map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <div className={classes.root}>
        <Button size="large" variant="contained" color="primary">
          견적 상세 추가
        </Button>
        <Button size="large" variant="contained" color="primary">
          선택한 상세 삭제
        </Button>
        <Button size="large" variant="contained" color="primary">
          일괄저장
        </Button>
      </div>

      {/**======================================================= */}
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer className={classes.container}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Estimate;

//===========================양지훈꺼============================================
