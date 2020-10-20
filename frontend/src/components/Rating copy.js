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
      <span>
        <i
          // color of start
          style={{ color }}
          // number of starts
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>{text && text}</span>
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
