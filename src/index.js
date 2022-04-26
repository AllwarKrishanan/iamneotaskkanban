import React, { Component } from "react";
import "./styles.css";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { columnMap, candidates } from "./data";

const JobBand = styled.div`background-color: #f8f8f8;display: flex;padding: 7px;font-size: 13px;font-weight: 600;border-bottom: 1px solid #ccc;justify-content: space-between;`;
const Container = styled.div`display: inline-flex;background-color: #ebecf0;width: 100%;overflow-x: scroll;`;
const Band = styled.div`display: flex;padding: 7px;font-size: 13px;font-weight: 600;background-color: #ebecf0;white-space: nowrap;`;
const FilterIcon = styled.div`margin-left: 55%;justify-content: space-between;width: 69px;display: flex;color: #929090;background-color: #ebecf0;`;
const SortBy = styled.div`margin: 0px 0px 0px 180px;background-color: #ebecf0;display: flex;`;
const HeadElement = styled.div`margin: 0px 0px 0px 30px;background-color: #ebecf0;display: flex;justify-content: center;align-items: center;`;
const Active = styled.div`display: flex;justify-content: space-evenly;color: #929090;width: 93px;display: flex;`;
const Sort = styled.div`color: #929090;margin-right: 8px;`;
const FilterDetails = styled.div`display: flex;`;
const Round = styled.div`display: inline-block;border-radius: 60px;box-shadow: 0 0 2px #888;padding: 12px 12px;margin-right: 8px;background-color: #7912bc;color: #fff;`;
const Box = styled.div`padding: 3px;font-size: 13px;font-weight: normal;background-color: #fff;border-radius: 3px;border: 1px solid #c7c2c2;margin: 0px 8px;display: flex;justify-content: center;align-items: center;cursor: pointer;`;
const Circle = styled.div`width: 25px;height: 25px;border: 1px solid #5d5;border-radius: 50%;background-color: lightgreen;position: relative;left: 7px;color: #fff;text-align: center;font-size: 15px;font-weight: 400;`;
const Input = styled.input`height: 20px;font-size: 14px;border: none;border-bottom: 1px solid #ebe5e5;border-radius: 2px;padding: 8px;outline: none;box-sizing: border-box;`;
const KanbanBorad = styled.div`display: flex;`;
const Buttons = styled.div`display: flex;flex-direction: column;justify-content: space-around;height: 100%;`;
const SideBands = styled.div`height: 94%;`;
const TopButton = styled.div`display: grid;grid-template-columns: max-content;row-gap: 2rem;justify-content: center;
i {font-size: 18px;padding: 13px;border-radius: 8px;text-align: center; &:hover {background: #9c42c4;}}`;

const BottomButton = styled.div`
  display: grid;
  grid-template-columns: max-content;
  row-gap: 2rem;
  justify-content: center;
  margin-top: -20px;
  i {
    font-size: 18px;
    padding: 13px;
    border-radius: 8px;
    text-align: center;
    &:hover {
      background: #9c42c4;
    }
  }
`;
class Board extends Component {
  static defaultProps = {isCombineEnabled: false};
  state = {columns: this.props.initial, ordered: Object.keys(this.props.initial)};
  onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }
      const column = this.state.columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns = {...this.state.columns, [result.source.droppableId]: withQuoteRemoved};
      this.setState({ columns });
      return;
    }
    // dropped nowhere
    if (!result.destination) { return; }
    const source = result.source; const destination = result.destination;
    // did not move anywhere
    if (
      source.droppableId === destination.droppableId && source.index === destination.index) { return; }
    // reordering column
    if (result.type === "COLUMN") {
      const ordered = reorder(this.state.ordered, source.index, destination.index); this.setState({ ordered });
      return;
    }
    const data = reorderQuoteMap({ quoteMap: this.state.columns, source, destination});
    this.setState({ columns: data.quoteMap });};

  render() {
    const columns = this.state.columns;
    const ordered = this.state.ordered;
    const { containerHeight } = this.props;
    const board = (
      <Droppable style={{ marginTop: "55px" }} droppableId="board" type="COLUMN" direction="horizontal" ignoreContainerClipping={Boolean(containerHeight)} isCombineEnabled={this.props.isCombineEnabled}>
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key, index) => (<Column key={key} index={index} title={key} candidates={columns[key]} isCombineEnabled={this.props.isCombineEnabled}/>))}
            {provided.placeholder}
          </Container>)}
      </Droppable>);

    const filterBand = (
      <Band>
        <HeadElement> All candidates - <Active> Active ({candidates.length}){" "} <i style={{ cursor: "pointer" }} className="fa fa-angle-down"></i></Active></HeadElement>
        <SortBy><Sort> Sort by</Sort> Last Updated{" "} <i style={{ marginLeft: "8px", cursor: "pointer" }} className="fa fa-angle-down"></i></SortBy>
        <FilterIcon>
          <i className="fa-solid fa-list-ul" style={{ cursor: "pointer" }}></i>
          <i className="fa fa-filter" style={{ cursor: "pointer" }}></i>
          <i className="fa fa-arrow-up-from-bracket" style={{ cursor: "pointer" }}></i>
        </FilterIcon>
      </Band>);

    const detailBand = (
      <JobBand>
        <HeadElement style={{ backgroundColor: "#f8f8f8" }}>
          <i style={{ marginRight: "8px" }} className="fa-solid fa-briefcase" ></i> Jobs
          <i style={{ margin: "0px 8px" }} className="fa-solid fa-angle-right" ></i> Full-stack Engineer
          <Box>View Job Details</Box>
        </HeadElement>
        <FilterDetails>
          <Box style={{ margin: "0px", borderRadius: "3px 0px 0px 3px" }}> Add candidates </Box>
          <Box style={{ margin: "0px", borderRadius: "0px 3px 3px 0px" }}> <i className="fa fa-angle-down" style={{ margin: "4px" }}></i> </Box>
          <Box style={{ margin: "0px 12px", backgroundColor: "#46467c", color: "#fff" }}> <i style={{ margin: "4px" }} className="fa-solid fa-globe"></i> Published <i style={{ margin: "4px" }} className="fa fa-angle-down"></i></Box>
        </FilterDetails>
      </JobBand>);

    const TalentCenterBand = (
      <JobBand style={{ backgroundColor: "#fff", alignItems: "center" }}>
        <HeadElement style={{ backgroundColor: "#fff" }}>
          <Round><i className="fa-solid fa-user" style={{ fontSize: "16px" }}></i></Round>
          <h2 style={{ fontWeight: "normal" }}> iamneo.ai Talent Center</h2></HeadElement>
        <FilterDetails style={{ alignItems: "center" }}>
          <i className="fa fa-search"></i>
          <Input type="text" placeholder="Search" />
          <Box style={{ margin: "0px 12px", backgroundColor: "#46467c", color: "#fff", paddingRight: "8px", height: "20px" }}>
            <i style={{ margin: "4px" }} className="fa-solid fa-plus"></i>Add New</Box>
          <i style={{ fontSize: "20px" }} className="fa-solid fa-gift"></i><Circle> S </Circle>
        </FilterDetails>
      </JobBand>);

    const SideBand = (<SideBands>
        <Round style={{padding: "10px 10px", margin: "8px", position: "relative"}}><i className="fa-solid fa-user" style={{ fontSize: "16px" }}></i></Round>
        <Buttons>
          <TopButton>{" "}
            <i style={{ cursor: "pointer" }} className="fa-solid fa-gauge-high"></i>
            <i style={{ cursor: "pointer" }} className="fa-solid fa-inbox"></i>
            <i style={{ cursor: "pointer", background: "#9c42c4" }} className="fa-solid fa-briefcase"></i>
            <i style={{ cursor: "pointer" }} className="fa-solid fa-user-group"></i>
            <i style={{ cursor: "pointer" }} className="fa-solid fa-gear"></i></TopButton>
          <BottomButton>{" "}
            <i style={{ cursor: "pointer" }} className="fa-regular fa-circle-question"></i>
            <i style={{ cursor: "pointer" }} className="fa-regular fa-message"></i>
            <i style={{ cursor: "pointer" }} className="fa-solid fa-grip"></i></BottomButton>
        </Buttons>
      </SideBands>);
    return (
      <React.Fragment>
   <KanbanBorad>
          <div style={{width: "4%", background: "rgb(70, 70, 124)", color: "#fff",}}>{SideBand}</div>
          <div style={{ width: "96%" }}> {TalentCenterBand} {detailBand} {filterBand} <DragDropContext onDragEnd={this.onDragEnd}> {board} </DragDropContext></div>
        </KanbanBorad>
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Board initial={columnMap} />, rootElement);
