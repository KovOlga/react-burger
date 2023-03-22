import PropTypes from "prop-types";

const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

export default ingredientType;
