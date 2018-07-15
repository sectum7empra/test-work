import { connect } from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import GraveyardTheme from '../components/GraveyardTheme';
import { Layout, defaultTheme } from 'admin-on-rest';

export default connect(state => ({
    theme: state.theme !== 'dark' ? GraveyardTheme : darkBaseTheme,
}))(Layout);