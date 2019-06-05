import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color } from "styled-system";
import icons from "../../icons/icons.json";
import theme from "../theme";

const iconNames = Object.keys(icons);

const getPathElements = icon => (
  <React.Fragment>
    {icon.path.map(path => (
      <path d={path} />
    ))}
  </React.Fragment>
);

const Svg = props => {
  const { icon, title, size, color: fillColor, focusable } = props;

  if (!icons[icon]) return false;
  return (
    <svg
      aria-hidden={title == null}
      width={size}
      height={size}
      fill={theme.colors[fillColor] ? theme.colors[fillColor] : fillColor}
      viewBox={icons[icon].viewBox}
      focusable={focusable}
      {...props}
    >
      {getPathElements(icons[icon])}
    </svg>
  );
};

Svg.propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string,
  focusable: PropTypes.bool
};

Svg.defaultProps = {
  color: "currentColor",
  title: null,
  size: "24px",
  focusable: false
};

const Icon = styled(Svg)(space, color, ({ size }) => ({
  minWidth: size
}));

Icon.propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string
};

Icon.defaultProps = {
  color: "currentColor",
  title: null,
  size: "24px"
};

const iconSizeRatio = 1.25;

const CenteredIcon = styled(Svg)(color, {
  position: "absolute",
  top: 0
});

const IconContainer = styled.span(space, {
  display: "inline-flex",
  alignSelf: "center",
  position: "relative",
  height: "1em",
  width: `${iconSizeRatio}em`
});

export const InlineIcon = props => (
  <IconContainer {...props}>
    <CenteredIcon size={`${iconSizeRatio}em`} {...props} />
  </IconContainer>
);

export default Icon;
