import { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

// import "./App.css";

DataTable.use(DT);

function Datatables() {
  // Demo data
  const [tableData, setTableData] = useState<
    Array<[string, string, string, string, string, string]>
  >([
    [
      "Tiger Nixon",
      "System Architect",
      "Edinburgh",
      "5421",
      "2011-04-25",
      "$320,800",
    ],
    [
      "Garrett Winters",
      "Accountant",
      "Tokyo",
      "8422",
      "2011-07-25",
      "$170,750",
    ],
    [
      "Ashton Cox",
      "Junior Technical Author",
      "San Francisco",
      "1562",
      "2009-01-12",
      "$86,000",
    ],
    [
      "Cedric Kelly",
      "Senior Javascript Developer",
      "Edinburgh",
      "6224",
      "2012-03-29",
      "$433,060",
    ],
  ]);

  return (
    <>
      <div>
        <DataTable data={tableData} className="display">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Extn.</th>
              <th>Start date</th>
              <th>Salary</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </>
  );
}

export default Datatables;
