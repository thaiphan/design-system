import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import React from "react";
import ReactResizeDetector from "react-resize-detector";
import { Icon } from "../Icon";
import { keyCodes } from "../utils";

const ScrollIndicatorButton = styled.button.attrs(({ side, scrollLeft }) => ({
  style: {
    left: side === "left" ? scrollLeft : undefined,
    right: side === "right" ? scrollLeft * -1 : undefined
  }
}))({
  position: "absolute",
  color: theme.colors.black,
  top: 0,
  bottom: 0,
  height: theme.space.x5,
  width: theme.space.x5,
  background: theme.colors.white,
  opacity: 0.8,
  zIndex: theme.zIndex.tabsScollIndicator,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: theme.fontWeights.medium,
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  backgroundColor: theme.colors.white,
  border: `0px solid`,
  margin: theme.space.none,
  "&:hover": {
    backgroundColor: theme.colors.lightBlue
  },
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.blue,
    boxShadow: theme.shadows.focus,
    backgroundColor: theme.colors.white,
    "&:hover": {
      backgroundColor: theme.colors.lightBlue
    }
  },
  "&:active": {},
  "&:disabled": {
    opacity: ".5"
  }
});

class ScrollIndicator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.side);
  }

  render() {
    return (
      <ScrollIndicatorButton
        {...this.props}
        onClick={this.handleClick}
        side={this.props.side}
        scrollLeft={this.props.scrollLeft}
      >
        <Icon icon={this.props.side === "right" ? "rightArrow" : "leftArrow"} />
      </ScrollIndicatorButton>
    );
  }
}

const TabContainer = styled.div({
  display: "flex",
  whiteSpace: "nowrap",
  overflowX: "scroll",
  overflowY: "hidden",
  "::-webkit-scrollbar": {
    display: "none"
  },
  position: "relative",
  "&:before": {
    content: "''",
    backgroundColor: theme.colors.grey,
    height: "1px",
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.selectedIndex || null,
      focusedIndex: 0,
      scrollLeft: 0,
      offsetWidth: 0,
      scrollWidth: 0
    };

    this.tabsRef = React.createRef();
    this.tabRefs = [];
    this.tabWidths = [];
    this.indicatorWidth = 40;
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.getTabWidths = this.getTabWidths.bind(this);
    this.setScrollLeftState = this.setScrollLeftState.bind(this);
    this.getScrollLeftValueByTabIndex = this.getScrollLeftValueByTabIndex.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.focusNextTab = this.focusNextTab.bind(this);
    this.focusPreviousTab = this.focusPreviousTab.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    this.getTabWidths();
  }

  handleIndicatorClick(side) {
    if (side === "right") {
      const lastVisibleTab = this.findLastVisibleTab();
      const scrollLeft = this.getScrollLeftValueByTabIndex(lastVisibleTab) - this.indicatorWidth;
      this.setScrollLeftState(scrollLeft);
    } else {
      const firstVisibleTab = this.findFirstVisibleTab();
      const scrollLeft =
        this.getScrollLeftValueByTabIndex(firstVisibleTab) +
        this.indicatorWidth +
        this.tabWidths[firstVisibleTab] -
        this.state.offsetWidth;
      this.setScrollLeftState(scrollLeft);
    }
  }

  findLastVisibleTab() {
    const rightMarker = this.state.scrollLeft + this.state.offsetWidth - this.indicatorWidth;
    let scrollLeftSum = 0;

    for (let i = 0; i < this.tabWidths.length; i++) {
      scrollLeftSum = scrollLeftSum + this.tabWidths[i];
      if (rightMarker <= scrollLeftSum) {
        return i;
      }
    }
    return null;
  }

  findFirstVisibleTab() {
    const leftMarker = this.state.scrollLeft + this.indicatorWidth;
    let scrollLeftSum = 0;

    for (let i = 0; i < this.tabWidths.length; i++) {
      scrollLeftSum = scrollLeftSum + this.tabWidths[i];
      if (leftMarker <= scrollLeftSum) {
        return i;
      }
    }
    return null;
  }

  getScrollLeftValueByTabIndex(index) {
    let scrollLeftSum = 0;
    for (let i = 0; i < index; i++) {
      scrollLeftSum = scrollLeftSum + this.tabWidths[i];
    }
    return scrollLeftSum;
  }

  setScrollLeftState(scrollLeft) {
    this.setState({ scrollLeft: scrollLeft }, this.applyScrollLeft);
  }

  applyScrollLeft() {
    this.tabsRef.current.scrollLeft = this.state.scrollLeft;
  }

  getTabWidths() {
    for (let i = 0; i < this.tabRefs.length; i++) {
      this.tabWidths[i] = this.tabRefs[i].offsetWidth;
    }
  }

  handleResize() {
    this.setState({
      offsetWidth: this.tabsRef.current.offsetWidth,
      scrollWidth: this.tabsRef.current.scrollWidth
    });
  }

  handleScroll() {
    if (this.tabsRef.current) {
      this.setState({
        scrollLeft: this.tabsRef.current.scrollLeft
      });
    }
  }

  contentHiddenRight() {
    return this.state.scrollLeft + this.state.offsetWidth < this.state.scrollWidth;
  }

  contentHiddenLeft() {
    return this.state.scrollLeft !== 0 && this.state.offsetWidth < this.state.scrollWidth;
  }

  handleTabClick(index) {
    this.tabRefs[index].focus();
    this.setState({
      selectedIndex: index,
      focusedIndex: index
    });
  }

  focusNextTab() {
    this.setState(
      prevState => ({
        focusedIndex: prevState.focusedIndex === this.tabRefs.length - 1 ? 0 : prevState.focusedIndex + 1
      }),
      this.setFocusToTab
    );
  }

  focusPreviousTab() {
    this.setState(
      prevState => ({
        focusedIndex: prevState.focusedIndex === 0 ? this.tabRefs.length - 1 : prevState.focusedIndex - 1
      }),
      this.setFocusToTab
    );
  }

  setFocusToTab() {
    console.log(this.state.focusedIndex);
    this.tabRefs[this.state.focusedIndex].focus();
  }

  onKeyPress(e) {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        this.focusPreviousTab();
        break;

      case "ArrowRight":
        e.preventDefault();
        this.focusNextTab();
        break;

      default:
        break;
    }
  }

  render() {
    const { children, fitted } = this.props;
    const { selectedIndex, focusedIndex, scrollLeft } = this.state;

    return (
      <TabContainer onKeyDown={this.onKeyPress} onScroll={this.handleScroll} ref={this.tabsRef}>
        <ReactResizeDetector handleWidth onResize={this.handleResize} />
        {this.contentHiddenLeft() && (
          <ScrollIndicator tabIndex={-1} side="left" scrollLeft={scrollLeft} onClick={this.handleIndicatorClick} />
        )}
        {React.Children.map(children, (tab, index) =>
          React.cloneElement(tab, {
            onClick: this.props.selectedIndex
              ? tab.props.onClick
              : () => {
                  this.handleTabClick(index);
                },
            onFocus: e => {
              e.stopPropagation();
            },
            index: index,
            tabIndex: index === focusedIndex ? 0 : -1,
            selected: index === selectedIndex ? true : false,
            fullWidth: fitted,
            ref: ref => (this.tabRefs[index] = ref)
          })
        )}
        {this.contentHiddenRight() && (
          <ScrollIndicator tabIndex={-1} side="right" scrollLeft={scrollLeft} onClick={this.handleIndicatorClick} />
        )}
      </TabContainer>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  selectedIndex: PropTypes.number
};

Tabs.defaultProps = {
  children: null,
  selectedIndex: undefined
};

export default Tabs;
