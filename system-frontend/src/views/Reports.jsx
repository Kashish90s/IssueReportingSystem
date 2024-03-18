import "./Reports.css";
import ReportContainer from "./ReportContainer";
import { useStateContext } from "../context/ContextProvider";

export default function Reports() {
  const { report, loading } = useStateContext();

  return (
    <div>
      <div>
        Filter: <span className="btn-filter ">Recent</span> |{" "}
        <span className="btn-filter ">Most Popular</span> |
        <span className="btn-filter ">Completed</span>
      </div>
      <div className="Reports animated fadeInDown">
        {loading ? (
          <table>
            <tbody>
              <tr>
                <td className="text-center">Loading...</td>
              </tr>
            </tbody>
          </table>
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
