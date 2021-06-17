import React from 'react';
/**
 * React.ReactNode: 是一种联合类型(Union Types);
 * type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
 */
interface CardProps {
  title?: string,
  renderTitle?: Function,
  children: React.ReactNode
}

export const KanbanScreen = (props: CardProps) => {
  const { renderTitle } = props

  let titleRen = renderTitle ? renderTitle() : null
  return <div>
    <h2>{props.title}</h2>
    {titleRen}
    <div>{props.children}</div>
  </div>
}