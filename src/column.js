import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Task from "./task";

const Container = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  background-color: #ebecf0;
`;
const Header = styled.div`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 2px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 3px;
  border-left: 5px solid lightgreen;
  width: 92.1%;
  margin-left: 10px;
`;

const Title = styled.h4`
  padding: 8px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid rgb(153, 141, 217);
    outline-offset: 2px;
  }
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
`;
export default class Column extends Component {
  render() {
    const title = this.props.title;
    const candidates = this.props.candidates;
    const index = this.props.index;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {title} - {this.props.candidates.length}
              </Title>
            </Header>
            <Task
              listId={title}
              candidates={candidates}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
