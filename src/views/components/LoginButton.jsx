const PropTypes = require('prop-types');
const React = require('react');

const LoginButton = ({ user }) => {
    return (
        <a
            className={`LoginButton LoginButton--${user ? 'logout' : 'login'}`}
            href={`${!user ? '/logout/' : '/login/'}`}
            role="button"
        >
            {user ? 'Uitloggen' : 'Inloggen'}
        </a>
    );
};

LoginButton.propTypes = {
    user: PropTypes.object,
};

module.exports = LoginButton;
