import React, { Component } from "react";

import "./productAttribute.css";

export default class ProductAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: props.attribute,
      selectedItem: {},
      finished: false,
    };
  }

  componentDidMount() {
    const makeDefaultAttributes = () => {
      let tmp = this.props.selectedAttributes;
      let attributeId = this.props.attribute.id;
      let fistItem = this.props.attribute.items[0];

      tmp.push({ id: attributeId, selectedItem: fistItem });

      this.props.setSelectedAttributes(tmp);
      this.setState({ selectedItem: fistItem, finished: true });
    };

    makeDefaultAttributes();
  }

  render() {
    let { selectedItem } = this.state;
    let { selectedAttributes, setSelectedAttributes, attribute } = this.props;

    const selectItem = (attributeId, item) => {
      let tmp = selectedAttributes;
      tmp.map((attribute) =>
        attribute.id === attributeId ? (attribute.selectedItem = item) : ""
      );

      this.setState({ selectedItem: item });
      setSelectedAttributes(tmp);
    };

    return (
      <>
        {this.state.finished && (
          <div className="attribute__container">
            <div className="attribute__name">
              <h3>{attribute.name}:</h3>
            </div>
            <div className="attribute__items">
              {attribute.items.map((item) => (
                <div
                  onClick={() => selectItem(attribute.id, item)}
                  key={item.id}
                  className={`attribute__item ${
                    selectedItem.id?.toLowerCase() === item.id?.toLowerCase()
                      ? "attribute__item__selected"
                      : ""
                  }`}
                  style={
                    attribute.id.toLowerCase() === "color"
                      ? { background: item.value }
                      : {}
                  }
                >
                  {attribute.id.toLowerCase() !== "color" ? (
                    <p>{item.value}</p>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
