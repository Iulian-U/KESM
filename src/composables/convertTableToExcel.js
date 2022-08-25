const converTableToExcel = () => {
  const convertTable = (table, tableName) => {
    TableToExcel.convert(table, {
      name: `${tableName}.xlsx`,
      sheet: {
        name: "Sheet 1",
      },
    });
  };

  return { convertTable };
};

export default converTableToExcel;
