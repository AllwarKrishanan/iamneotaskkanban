import React from "react";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";

const Container = styled.a`
  border-radius: 8px;
  background-color: #f2f2f2;
  box-shadow: ${({ isDragging }) =>
    isDragging
      ? `rgba(0, 0, 0, 0.24) 0px 3px 8px`
      : `rgba(149, 157, 165, 0.2) 0px 8px 24px`};
  margin-bottom: 20px;
  min-height: 40px;
  user-select: none;
  text-decoration: none;
  color: rgb(9, 30, 66);
  &:hover,
  &:active {
    color: rgb(9, 30, 66);
    text-decoration: none;
  }
  &:focus {
    outline: none;
    border-color: ${(props) => props.colors.hard};
    box-shadow: none;
  }
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
`;
const ComName = styled.div`
  color: rgb(91, 90, 90);
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 400;
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: rgb(165, 157, 157);
  font-weight: 600;
`;

const NameContent = styled.div`
  display: flex;

  align-items: center;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
  color: rgb(177, 169, 169);
`;

const Name = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #4851d5;
  margin-top: 5px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #5d5;
  border-radius: 10px;
  background-color: lightgreen;
  position: relative;
  left: 92.1px;
  color: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
`;

const TopBody = styled.div`
  padding: 8px;
  border-left: 3px solid #85c185;
  margin: 3px;
  background-color: #fff;
  border-radius: 2px;
`;

const BottomBody = styled.div`
  background-color: #f2f2f2;
  padding: 4px;
`;

export default class TaskList extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      rating: 0,
    };
  }

  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }
  render() {
    const { candidate, isDragging, isGroupedOver, provided } = this.props;
    const { rating } = this.state;
    return (
      <Container
        isDragging={isDragging}
        isGroupedOver={isGroupedOver}
        colors={candidate.column.colors}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        <TopBody>
          <NameContent>
            <Name>{candidate.Name}</Name>{" "}
            <i style={{ marginLeft: "5px", color: "red", marginTop: "5px" }} className="fa-solid fa-user-group"></i>
          </NameContent>
          <Content>
            <ComName>{candidate.Company}</ComName>
          </Content>
        </TopBody>
        <BottomBody>
          <Footer style={{ fontSize: "20px" }}>
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick.bind(this)}/>
            <Circle> S </Circle>
            <i className="fa fa-ellipsis-v"></i>
          </Footer>
        </BottomBody>
      </Container>
    );
  }
}
