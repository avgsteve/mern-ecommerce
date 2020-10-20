import React from "react";
import PropTypes from "prop-types";

// used in Card.Text element in Product.js Component
const Rating = ({
  value,
  text,
  color, // use default value from Rating.defaultProps
}) => {
  return (
    <div className="rating">
      {/* css style:  .rating span  { ... } */}

      {[1, 2, 3, 4, 5].map((index) => (
        <i
          key={index}
          className={
            value >= index
              ? "fas fa-star"
              : value >= index - 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      ))}
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.prototypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
