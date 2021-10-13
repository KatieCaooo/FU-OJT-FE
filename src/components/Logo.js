import PropTypes from 'prop-types';

const Logo = (props) => {
  const { width, height, hidden } = props;
  return (
    <img
      alt="Logo"
      src="/static/ojt_logo_1.svg"
      {...props}
      width={width || '100%'}
      height={height || 'auto'}
      hidden={hidden}
    />
  );
};

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  hidden: PropTypes.string,
};

export default Logo;
