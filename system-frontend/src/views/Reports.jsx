import "./Reports.css";
import ReportContainer from "./ReportContainer";
import { useStateContext } from "../context/ContextProvider";

export default function Reports() {
  const { report, loading } = useStateContext();

  return (
    <div>
      <div>Sorting: Recent | Most Popular | Completed</div>
      <div className="Reports">
        {loading ? (
          <p>Loading reports...</p>
        ) : (
          report &&
          report.map((item) => (
            <ReportContainer
              key={item.id}
              className="Reports-item"
              report={item}
            />
          ))
        )}
      </div>
    </div>
  );
}
