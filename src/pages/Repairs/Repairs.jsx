import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getAllRepairs} from "../../redux/operations";
import {leftMenuActions} from "../../redux/actions/index"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useHistory} from "react-router-dom";
import moment from "moment";


const columns = [
    {id: 'repairId', label: 'ID:', minWidth: 25},
    {id: 'manufacturer', label: 'Producent', minWidth: 100},
    {id: 'model', label: 'Model', minWidth: 100},
    {id: 'serialNumber', label: 'Numer seryjny', minWidth: 100},
    {id: 'faultDescription', label: 'Opis usterki', minWidth: 300, align: 'left'},
    {id: 'dateOfAdd', label: 'Data przyjęcia', minWidth: 100},
    {id: 'status', label: 'Status', minWidth: 100}
];

const leftMenuItems = [
    {path: "/repairs", text: "Aktualne naprawy"},
    {path: "/repairs/newrepair", text: "Dodaj naprawę"},
    {path: "/repairs/clients", text: "Baza klientow"},
    {path: "/repairs/units", text: "Baza urządzeń"},
    {path: "/repairs/faults", text: "Baza usterek"},
];

const Repairs = () => {
    const dispatch = useDispatch();
    const history = useHistory();

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

    if (repairs.length === 0) return (<>Loading...</>);

    return (
        //todo:
        //- Edycja naprawy
        //- Statusy napraw
        //- Możliwość rejestrowania napraw online przez klienta
        //- Możliwość obserwacji statusu naprawy przez klienta po przez podanie np. numeru tel i imienia albo numeru seryjnego
        //- Dołączanie zdjęć do zlecenia

        // -dołączanie dokumentacji do bazy modeli aby zawsze można było w zleceniu sobie ją ściągnąć
        // - możliość opłacenia naprawy przez klienta
        // - dodatek przy opłacaniu "A może jeszcze..." gdzie do ostateczneij kwoty naprawy można dokupić jakąś zużytą gałkę
        <div>

            Aktualne naprawy:
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell

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

                                            switch (column.id) {
                                                case "model":
                                                    value = repair.device.model;
                                                    break;
                                                case "manufacturer":
                                                    value = repair.device.manufacturer;
                                                    break;
                                                case "dateOfAdd":
                                                    value = moment(repair.device.dateOfAdd)
                                                        .locale("pl")
                                                        .format("YYYY-MM-DD HH:mm");
                                                    break;
                                                case "status":
                                                    if (repair.status === "New") {
                                                        value = "Przyjęte do serwisu";
                                                        console.log("xxx")
                                                    } else {
                                                        value = "Nieznany"
                                                    }
                                                default:
                                                    value = repair[column.id];
                                            }

                                            return (
                                                <TableCell key={column.id}
                                                           align={column.align}
                                                >

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