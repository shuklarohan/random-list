import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#364f6b",
            light: "#bcbab8"
        },
        secondary: {
            main: "#3fc1c9",
            light: "rgb(242, 242, 242)"
        },
        background: {
            default: "#F5F5F5"
        }
    },
    typography: {
        useNextVariants: true,
        fontFamily: [
            'IBM Plex Sans',
            // 'Montserrat',
            'sans-serif',
        ].join(","),
        body1: {
            fontSize: "15px"
        }
    }
});

export {
    theme,
}