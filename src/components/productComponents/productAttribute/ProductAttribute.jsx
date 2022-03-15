import React, { Component } from "react";

import "./productAttribute.css";

export default class ProductAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: props.attribute,
      selectedAttributes: props.selectedAttributes,
      selectedItem: {},
      finished: false,
    };
  }

  componentDidMount() {
    const makeDefault = () => {
      // let tmp = this.state.selectedAttributes;
      // let attributeId = this.state.attribute.id;
      // let fistItemId = this.state.attribute.items[0].id;
      // let firstItemValue = this.state.attribute.items[0].value;

      // tmp[attributeId] = [fistItemId, firstItemValue];

      // this.props.setSelectedAttributes(tmp);

      let tmp = this.state.selectedAttributes;
      let attributeId = this.state.attribute.id;
      let fistItem = this.state.attribute.items[0];

      tmp.push({ id: attributeId, selectedItem: fistItem });

      this.props.setSelectedAttributes(tmp);
      this.setState({ selectedItem: fistItem });
      this.setState({ finished: true });
    };

    makeDefault();
  }

  render() {
    let { attribute, selectedAttributes, selectedItem } = this.state;

    let { setSelectedAttributes } = this.props;

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
              {attribute.id.toLowerCase() === "color"
                ? attribute.items.map((item) => (
                    <div
                      onClick={() => selectItem(attribute.id, item)}
                      key={item.id}
                      className={`attribute__item ${
                        selectedItem.id?.toLowerCase() ===
                        item.id?.toLowerCase()
                          ? "attribute__item__selected"
                          : ""
                      }`}
                      style={{ background: item.value }}
                    ></div>
                  ))
                : attribute.items.map((item) => (
                    <div
                      onClick={() => selectItem(attribute.id, item)}
                      className={`attribute__item ${
                        selectedItem.id?.toLowerCase() ===
                        item.id?.toLowerCase()
                          ? "attribute__item__selected"
                          : ""
                      }`}
                      key={item.id}
                    >
                      <p>{item.value}</p>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
