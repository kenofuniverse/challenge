import React, { Component } from 'react';
import DirStructure from '../types';
import '../App.css';

export interface TreeProps {
  data: DirStructure[];
  collapsible?: Boolean;
};

class Tree extends Component<TreeProps, {}> {
  onClickItem(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (this.props.collapsible) {
      const collapse = event.currentTarget.nextElementSibling;
      if (collapse) {
        if (collapse.classList.contains('active')) {
          collapse.classList.remove('active');
        } else {
          collapse.classList.add('active');
        }
      }
    }
  }

  renderDir(data: DirStructure[]) {
    return (
      <ul className="directory-list">
        { data.map((item, index) => {
          if (item.children && item.children.length > 0) {
            return (
              <li key={index} className="directory-list__wrapper">
                <a
                  className="directory-list__item"
                  onClick={event => this.onClickItem(event)}
                >{ item.text }</a>
                { this.renderDir(item.children) }
              </li>
            );
          }
          return <li key={index} className="directory-list__wrapper">{ item.text }</li>
        }) }
      </ul>
    )
  }

  render() {
    const { data, collapsible } = this.props;

    return (
      <div className={`directory-tree ${collapsible ? 'collapsible' : ''}`}>
        { this.renderDir(data) }
      </div>
    )
  }
}

export default Tree;
