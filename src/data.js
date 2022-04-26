import { colors } from "@atlaskit/theme";

const Open = {id: "1", name: "Open", colors: { soft: colors.Y50, hard: colors.Y200 }};
const Contacted = {id: "2", name: "Contacted", colors: { soft: colors.G50, hard: colors.G200 }};
const Written_test = {id: "3",name: "Written test",colors: { soft: colors.B50, hard: colors.B200 }};
const Technical_round = {id: "4",name: "Technical round",colors: { soft: colors.P50, hard: colors.P200 }};
const culFit = {id: "5",name: "cultrue fit round",colors: { soft: colors.P50, hard: colors.P200 }};

export const columns = [Open, Contacted, Written_test, Technical_round, culFit];
export const candidates = [
  {id: "#1", Name: "Amirdharshan A", Company: "Intellectyx Data science private limited", column: Open},
  {id: "#2", Name: "Vimal Kumar", Company: "Sirius Computer Solutions", column: Open},
  {id: "#3", Name: "Jayakrishnan Duraisamy", Company: "Lakeba IT Solutions", column: Open},
  {id: "#4", Name: "Affan Ahmed Syed", Company: "Smart parking", column: Open},
  {id: "#5", Name: "Akash P", Company: "Centre", column: Contacted},
  {id: "#6", Name: "Gayathri L", Company: "Katomaran Technologies Pvt Ltd", column: Contacted},
  {id: "#7", Name: "S Suresh", Company: "Synopsis", column: Contacted},
  {id: "#8", Name: "Arun Prakash A", Company: "IIT Madras", column: Contacted},
  {id: "#9", Name: "Vijay Bhupathi V", Company: "Topclass Entertainment LLP", column: Written_test},
  {id: "#10", Name: "M Janasri", Company: "TCS", column: Written_test},
  {id: "#11", Name: "Mohamed Mubarak", Company: "MongoDB", column: Written_test},
  {id: "#12", Name: "Arun kumar", Company: "Vidhya Skill School", column: Technical_round},
  {id: "#13", Name: "Midhun Krishna S", Company: "Cognizant", column: Technical_round},
  {id: "#14", Name: "Gowri Shankar S", Company: "BM Technovations", column: Technical_round},
  {id: "#15", Name: "Dineshkumar", Company: "Wipro Technologies", column: culFit},
  {id: "#16", Name: "Pradeep K", Company: "Cognizant Technology Solutions", column: culFit},
  {id: "#17", Name: "Hemachandru K", Company: "Paypal Client", column: culFit},
  {id: "#18", Name: "Sruthi Radhakrishnan", Company: "Konnectify", column: culFit}];

const getByAuthor = (column, items) =>items.filter((candidate) => candidate.column === column);
export const columnMap = columns.reduce((previous, column) => ({...previous,[column.name]: getByAuthor(column, candidates),}),{});
