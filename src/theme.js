import { createMuiTheme} from '@material-ui/core/styles';
// import montserrat from 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap';



const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
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