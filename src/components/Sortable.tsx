import React, { Component } from 'react';
import DirStructure from '../types';
import { TreeProps } from './Tree';

export interface SortableProps {
  children: React.ReactNode;
};

class Sortable extends Component<SortableProps, {}> {
  sortData(data: DirStructure[]): DirStructure[] {
    const cloneData: DirStructure[] = [ ...data ];
    cloneData.sort( (a, b) => a.text < b.text ? -1 : a.text > b.text ? 1 : 0  );

    return cloneData.map(item => {
      if (item.children && item.children.length > 0) {
        return {
          text: item.text,
          children: this.sortData(item.children)
        };
      }
      return item;
    });
  }

  recursiveCloneChildren(children: React.ReactNode): React.ReactNode {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const childType: any = child.type;
        if (childType.name === 'Tree') {
          if (React.isValidElement<TreeProps>(child)) {
            const elementChild: React.ReactElement<TreeProps> = child;
            return React.cloneElement<TreeProps>(elementChild, {
              ...elementChild.props,
              key: index,
              data: this.sortData(elementChild.props.data)
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

export default Sortable;
