import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getAllRepairs} from "../../redux/operations";
import {leftMenuActions} from "../../redux/actions/index"
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from "react-router-dom";


const columns = [
    {id: 'repairId', label: 'ID:', minWidth: 25},
    {id: 'manufacturer', label: 'Producent', minWidth: 100},
    {id: 'model', label: 'Model', minWidth: 100},
    {id: 'serialNumber', label: 'Numer seryjny', minWidth: 100},
    {id: 'faultDescription', label: 'Opis usterki', minWidth: 400, align: 'left'},
    {id: 'dateOfAdd', label: 'Data przyjęcia', minWidth: 170},
];

const leftMenuItems = [
    {path: "/repairs", text:"Aktualne naprawy"},
    {path: "/repairs/newrepair", text:"Dodaj naprawę"},
    {path: "/repairs/clients", text:"Baza klientow"},
    {path: "/repairs/units", text:"Baza urządzeń"},
    {path: "/repairs/faults", text:"Baza usterek"},
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: "#424242",
    },
    head: {
        backgroundColor: "#424242",
        color: "white"
    },
    cell: {
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        padding: 1,
        fontSize: 15,
        color: "white"
    },
    container: {
        maxHeight: 440,
    },
    tableFooter: {
        color: "white"
    }
});


const Repairs = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRapairClick = (repairId) => {
        history.push("/repairs/repair-" + repairId)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        dispatch(getAllRepairs())
    }, [dispatch]);

    useEffect(() => {
        leftMenuActions.setLeftMenu([...leftMenuItems]);
    }, []);

    const repairs = useSelector(state => state.repairs);


    return (
        //todo:
        //- Edycja naprawy
        //- Statusy napraw
        //- Możliwość rejestrowania napraw online przez klienta
        //- Możliwość obserwacji statusu naprawy przez klienta po przez podanie np. numeru tel i imienia albo numeru seryjnego
        //- Dołączanie zdjęć do zlecenia
        <div>

            Aktualne naprawy:
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        classes={{head: classes.head}}
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}


                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {repairs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((repair) => {
                                return (
                                    <TableRow hover
                                              role="checkbox"
                                              tabIndex={-1}
                                              key={repair.repairId}
                                              onClick={() => handleRapairClick(repair.repairId)}>
                                        {columns.map((column) => {
                                            let value = null;
                                            if (column.id === "model"){
                                                value = repair.device.model
                                            }
                                            else if (column.id === "manufacturer"){
                                                value = repair.device.manufacturer
                                            }
                                            else {
                                                value = repair[column.id];
                                            }
                                            return (
                                                <TableCell key={column.id}
                                                           align={column.align}
                                                           classes={{root: classes.cell}}>

                                                    {value}

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
                    classes={{root: classes.tableFooter}}
                    rowsPerPageOptions={[10, 25, 100, 500]}
                    labelRowsPerPage={"Wyników na stronę:"}
                    labelDisplayedRows={({from, to, count}) => `Wyniki ${from}-${to} z ${count}`}
                    component="div"
                    count={repairs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};


export default Repairs;