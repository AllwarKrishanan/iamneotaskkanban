import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskList from "./taskList";

const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) {
    return "rgb(255, 235, 230)";
  }
  if (isDraggingFrom) {
    return "rgb(230, 252, 255)";
  }
  return "rgb(235, 236, 240)";
};

const Wrapper = styled.div`
  background-color: ${(props) =>
    getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex; flex-direction: column;opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : "inherit")};
  padding: 8px; border: 8px; padding-bottom: 0; transition: background-color 0.2s ease, opacity 0.1s ease; user-select: none; width: 350px;`;

const DropZone = styled.div`min-height: 600px; padding-bottom: 8px;`;

const Container = styled.div``;

class InnerQuoteList extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.candidates !== this.props.candidates;
  }

  render() {
    return this.props.candidates.map((candidate, index) => (
      <Draggable key={candidate.id} draggableId={candidate.id} index={index} shouldRespectForceTouch={false}>
        {(dragProvided, dragSnapshot) => (
          <TaskList  key={candidate.id} candidate={candidate} isDragging={dragSnapshot.isDragging} isGroupedOver={Boolean(dragSnapshot.combineTargetFor)} provided={dragProvided}/>
        )}
      </Draggable>
    ));
  }
}

class InnerList extends React.Component {
  render() {
    const { candidates, dropProvided } = this.props;
    return (
      <Container>
        <DropZone ref={dropProvided.innerRef}>
          <InnerQuoteList candidates={candidates} />
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  }
}

export default class Task extends React.Component {
  static defaultProps = { listId: "LIST"};
  render() {
    const {ignoreContainerClipping, isDropDisabled, isCombineEnabled, listId, listType, style, candidates, title} = this.props;

    return (
      <Droppable droppableId={listId} type={listType} ignoreContainerClipping={ignoreContainerClipping} isDropDisabled={isDropDisabled} isCombineEnabled={isCombineEnabled}>
        {(dropProvided, dropSnapshot) => (
          <Wrapper style={style} isDraggingOver={dropSnapshot.isDraggingOver} isDropDisabled={isDropDisabled} isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)} {...dropProvided.droppableProps}>
            <InnerList candidates={candidates} title={title} dropProvided={dropProvided}/>
          </Wrapper>)}
      </Droppable>
    );
  }
}
