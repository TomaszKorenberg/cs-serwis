import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {forwardRef} from 'react';
import {useSelector} from "react-redux";
import {leftMenuActions} from "../../redux/actions/index"
import moment from "moment";
import {useHistory} from "react-router-dom";
import {repairStatuses} from "../../constans";


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};


const leftMenuItems = [
    {path: "/repairs/all", text: "Aktualne naprawy"},
    {path: "/repairs/newrepair", text: "Dodaj naprawę"},
    {path: "/repairs/clients", text: "Baza klientow"},
    {path: "/repairs/units", text: "Baza urządzeń"},
    {path: "/repairs/faults", text: "Baza usterek"},
];

export default function Repairs() {
    const history = useHistory();
    const repairs = useSelector(state => state.repairs);


    useEffect(() => {
        leftMenuActions.setLeftMenu([...leftMenuItems]);
    }, []);


    const handleOnRowClick = (repairId) => {
        history.push("/repairs/repair-" + repairId)
    };


    const tableConfiguration = {

        columns: [
            {field: 'repairId', title: 'ID:', filtering: false, width: 25,},
            {field: 'device.manufacturer', title: "Producent", filtering: false, width: 100,},
            {field: 'device.model', title: 'Model', filtering: false},
            {field: 'serialNumber', title: 'Numer seryjny', filtering: false},
            {field: 'faultDescription', title: 'Opis usterki', filtering: false},
            {
                field: 'dateOfAdd', title: 'Data przyjęcia', filtering: false,defaultSort:"asc", render: dataRow => <>{
                    moment(dataRow.dateOfAdd)
                        .locale("pl")
                        .format("YYYY-MM-DD HH:mm")}</>
            },
            {
                field: 'status', title: 'Status', render: dataRow => {
                    switch (dataRow.status) {
                        case repairStatuses.new.info:
                            return (<>{repairStatuses.new.shortDescription}</>);
                        case repairStatuses.start.info:
                            return (<>{repairStatuses.start.shortDescription}</>);
                        case repairStatuses.expertise.info:
                            return (<>{repairStatuses.expertise.shortDescription}</>);
                        case repairStatuses.repairStart.info:
                            return (<>{repairStatuses.repairStart.shortDescription}</>);
                        case repairStatuses.waitingForwarded.info:
                            return(<>{repairStatuses.waitingForwarded.shortDescription}</>);
                        case repairStatuses.waitingSpareParts.info:
                            return (<>{repairStatuses.waitingSpareParts.shortDescription}</>);
                        case repairStatuses.repairEnd.info:
                            return (<>{repairStatuses.repairEnd.shortDescription}</>);
                        case repairStatuses.end.info:
                            return (<>{repairStatuses.end.shortDescription}</>);
                        case repairStatuses.registered.info:
                            return (<>{repairStatuses.registered.shortDescription}</>);
                        default:
                            return (<>{dataRow.status}</>);
                    }
                },
                lookup: {
                    "new": repairStatuses.new.shortDescription,
                    "start": repairStatuses.start.shortDescription,
                    "expertise": repairStatuses.expertise.shortDescription,
                    "repair start": repairStatuses.repairStart.shortDescription,
                    "waiting forwarded": repairStatuses.waitingForwarded.shortDescription,
                    "waiting spare parts": repairStatuses.waitingSpareParts.shortDescription,
                    "repair end": repairStatuses.repairEnd.shortDescription,
                    "end": repairStatuses.end.shortDescription,
                    "registered": repairStatuses.registered.shortDescription
                },
                filterPlaceholder: "Filtruj",
            }
        ],

        localization: {
            pagination: {
                labelDisplayedRows: "{from}-{to} z {count}",
                labelRowsSelect: "wyników na stronę",
                firstTooltip: "Pierwsza strona",
                previousTooltip: "Poprzednia strona",
                nextTooltip: "Następna strona",
                lastTooltip: "Ostatnia strona"

            },
            toolbar: {
                searchPlaceholder: "Szukaj",
                searchTooltip: "Szukaj"

            }
        },
        options: {
            emptyRowsWhenPaging: false,
            pageSize: 20,
            pageSizeOptions: [5, 10, 20, 50, 100, 200],
            filtering: true,
            cellStyle: {
                padding: "0px",
                fontSize: "15px",
                height: "23px",
                paddingLeft: "10px"
            },
            tableLayout: "fixed"
        },
    };


    return (
        <MaterialTable
            icons={tableIcons}
            title="Aktualne naprawy:"
            columns={tableConfiguration.columns}
            data={repairs}
            localization={tableConfiguration.localization}
            options={tableConfiguration.options}
            onRowClick={(event, rowData) => handleOnRowClick(rowData.repairId)}
        />
    );
}
