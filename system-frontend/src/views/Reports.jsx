const getReports = () => {
  setLoading(true);
  let apiUrl;

  if (activeFilter === "recent") {
    apiUrl = "/report?page=" + count;
  } else if (activeFilter === "completed") {
    apiUrl = "/report/completed?page=" + count;
  } else if (activeFilter === "popular") {
    apiUrl = "/report/popular?page=" + count;
  }

  if (apiUrl) {
    axiosClient
      .get(apiUrl)
      .then(({ data }) => {
        const reports = data.reports.map((item) => ({
          ...item,
          issue_label:
            IssueType.find((type) => type.value === item.issue_status)?.label ||
            "Unknown",
          // Ensure item.votes is a string containing valid JSON data
          votes: item.votes ? JSON.parse(item.votes) : [],
        }));
        setLoading(false);
        setReport(reports);
      })
      .catch(() => {
        setLoading(false);
      });
  }
};
