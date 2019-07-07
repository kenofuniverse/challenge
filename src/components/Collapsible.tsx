import React, { Component } from 'react';
import { TreeProps } from './Tree';
import { SortableProps } from './Sortable';

export interface CollapsibleProps {
  children: React.ReactNode;
};

class Collapsible extends Component<CollapsibleProps, {}> {
  recursiveCloneChildren(children: React.ReactNode): React.ReactNode {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const childType: any = child.type;
        if (childType.name === 'Sortable') {
          if (React.isValidElement<SortableProps>(child)) {
            const elementChild: React.ReactElement<SortableProps> = child;
            return React.cloneElement<SortableProps>(elementChild, {
              ...elementChild.props,
              key: index,
              children: this.recursiveCloneChildren(elementChild.props.children)
            });
          }
        } else if (childType.name === 'Tree') {
          if (React.isValidElement<TreeProps>(child)) {
            const elementChild: React.ReactElement<TreeProps> = child;
            return React.cloneElement<TreeProps>(elementChild, {
              ...elementChild.props,
              key: index,
              collapsible: true,
            });
          }
        } else {
          const elementChild: React.ReactElement<any> = child;
          return React.cloneElement<any>(elementChild, {
            ...elementChild.props,
            key: index,
            children: this.recursiveCloneChildren(elementChild.props.children)
          });
        }
      }
    });
  }

  render() {
    const { children } = this.props;
    return this.recursiveCloneChildren(children);
  }
}

export default Collapsible;
