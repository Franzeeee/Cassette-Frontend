import { useState } from "react";
import Layout from "../Layout/Layout";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import "../assets/css/artist-management.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "@mui/material";

// Import FontAwesome icons here (assuming you've added them to your project)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faBan, faUndo } from "@fortawesome/free-solid-svg-icons";
import artistProfilePicture from "../assets/img/artist-img.jpg";

function ArtistManagement() {
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const userData = [
    {
      name: "John Philips",
      genre: "Rap",
      Description: "",
      status: "Pending Request",
      youtubeLink: "https://www.youtube.com/",
      twitterLink: "https://twitter.com/",
      facebookLink: "https://www.facebook.com/",
    },
    {
      name: "George Michelle",
      genre: "Ballad",
      Description: "",
      status: "Banned",
      youtubeLink: "https://www.youtube.com/",
      twitterLink: "https://twitter.com/",
      facebookLink: "https://www.facebook.com/",
    },
    {
      name: "Rae Mond",
      genre: "Rap",
      Description: "",
      status: "Active",
      youtubeLink: "https://www.youtube.com/",
      twitterLink: "https://twitter.com/",
      facebookLink: "https://www.facebook.com/",
    },
    {
      name: "Zrake",
      genre: "Rap",
      Description: "",
      status: "Pending Request",
      youtubeLink: "https://www.youtube.com/",
      twitterLink: "https://twitter.com/",
      facebookLink: "https://www.facebook.com/",
    },
    // Add more objects with social media links as needed
  ];

  const renderHeader = () => {
    return (
      <div className="search-bar d-flex justify-content-end">
        <input
          type="search"
          value={globalFilterValue}
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          placeholder="Global Search"
        />
      </div>
    );
  };

  const header = renderHeader();

  // Function to handle approve action
  const handleApprove = (rowData) => {
    // Add your logic here to handle approve action
    console.log("Approving:", rowData.name);
  };

  // Function to handle deny action
  const handleDeny = (rowData) => {
    // Add your logic here to handle deny action
    console.log("Denying:", rowData.name);
  };

  // Define the actions column header and body
  const actionsHeader = (
    <div className="text-center" style={{ width: "80px" }}>
      Actions
    </div>
  );
  const actionsBody = (rowData) => {
    let actionButtons;
    switch (rowData.status) {
      case "Active":
        actionButtons = (
          <div className="d-flex justify-content-center">
            <Tooltip title="Ban Artist" arrow>
              <button
                className="p-button p-button-danger ban-btn"
                onClick={() => handleBan(rowData)}
              >
                <FontAwesomeIcon icon={faBan} />
              </button>
            </Tooltip>
          </div>
        );
        break;
      case "Pending Request":
        actionButtons = (
          <div className="d-flex justify-content-center">
            <Tooltip title="Approve Request" arrow>
              <button
                className="p-button p-button-success mr-2 approve-btn"
                onClick={() => handleApprove(rowData)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </Tooltip>
            <Tooltip title="Deny Request" arrow>
              <button
                className="p-button p-button-danger deny-btn"
                onClick={() => handleDeny(rowData)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </Tooltip>
          </div>
        );
        break;
      case "Banned":
        actionButtons = (
          <div className="d-flex justify-content-center">
            <Tooltip title="Unban Artist" arrow>
              <button
                className="p-button p-button-success unban-btn"
                onClick={() => handleUnban(rowData)}
              >
                <FontAwesomeIcon icon={faUndo} />
              </button>
            </Tooltip>
          </div>
        );
        break;
      default:
        actionButtons = null;
    }

    return actionButtons;
  };

  // Define the description column header and body
  const descriptionHeader = <div className="text-center">Description</div>;
  const descriptionBody = (rowData) => {
    return (
      <div>
        <div>Real Name: {rowData.name}</div>
        <div>Genre: {rowData.genre}</div>
        {/* View More link */}
        <div>
          <a href="#" onClick={() => handleViewMore(rowData)}>
            View More
          </a>
        </div>
      </div>
    );
  };

  return (
    <Layout activePage={"Artist Management"}>
      <div className="container w-100 h-100 m-0 p-3 py-2 dashboard-container overflow-hidden ">
        <div className="row w-auto m-0 overflow-x-hidden overflow-y-auto">
          <div className="col p-2 m-0 mt-1 page-title d-flex align-items-center justify-content-between ">
            <h1 className="m-0">Artist Management</h1>
            <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
              <Link color="#fffffff2" href="/">
                <HomeOutlined className="home-breedcrumbs" fontSize="small" />
              </Link>
              <Typography color="#d40000" fontSize="small">
                Artist Management
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
        <div className="container-fluid h-100 content-container p-2">
          <div className="card w-100 table-container align-items-center d-flex justify-content-start">
            <DataTable
              scrollable
              value={userData}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginatorTemplate=" FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="{first} to {last} of {totalRecords}"
              tableStyle={{ minWidth: "60rem" }}
              scrollHeight="350px"
              globalFilter={globalFilterValue}
              header={header}
            >
              <Column
                sortable
                style={{ width: "20%" }}
                field="name"
                header="Artist"
                body={(rowData) => (
                  <div className="d-flex align-items-center">
                    <div className="artist-profile-picture">
                      <img src={artistProfilePicture} alt="Artist Profile" />
                    </div>
                    <div className="ml-2">{rowData.name}</div>
                  </div>
                )}
              />

              {/* Description column */}
              <Column
                style={{ width: "30%" }}
                header={descriptionHeader}
                body={descriptionBody}
              ></Column>
              <Column
                sortable
                field="status"
                header="Status"
                body={(rowData) => {
                  let statusColor = "";
                  switch (rowData.status) {
                    case "Active":
                      statusColor = "#00ff00";
                      break;
                    case "Pending Request":
                      statusColor = "#F5E30F";
                      break;
                    case "Banned":
                      statusColor = "#CE0000";
                      break;
                    default:
                      statusColor = "inherit";
                  }
                  return (
                    <span style={{ color: statusColor }}>{rowData.status}</span>
                  );
                }}
              />
              {/* Actions column */}
              <Column header={actionsHeader} body={actionsBody}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ArtistManagement;
