import { createMuiTheme} from '@material-ui/core/styles';

const font =  "Montserrat, sans-serif";


const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    typography: {
        fontFamily: font,
        fontSize: "15px"
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
    },
});

export default darkTheme