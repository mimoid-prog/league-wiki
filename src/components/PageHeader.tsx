import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PageHeaderWrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 30px;
  }

  ${(props) => props.theme.style.media.desktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Filters = styled.div`
  ${(props) => props.theme.style.media.desktop} {
    display: flex;
    align-items: center;

    p {
      margin-right: 5px;
    }
  }
`;

const Input = styled.input`
  padding: 5px;
  width: 100%;
  margin-bottom: 10px;

  ${(props) => props.theme.style.media.desktop} {
    width: auto;
    margin-right: 10px;
    margin-bottom: 0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;

  ${(props) => props.theme.style.media.desktop} {
    width: auto;
  }
`;

interface Props {
  title: string;
  data: any[];
  filterData: React.Dispatch<React.SetStateAction<any[]>>;
}

const PageHeader: React.FC<Props> = (props) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("asc");

  const onSearchChange = (e: any) => {
    setSearchValue(e.target.value);

    const newFilteredData = props.data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredData(newFilteredData);
    console.log(newFilteredData);

    if (sortValue === "asc") props.filterData(newFilteredData);
    else props.filterData([...newFilteredData].reverse());
  };

  const onSortChange = (e: any) => {
    setSortValue(e.target.value);
    if (e.target.value === "asc") props.filterData(filteredData);
    else props.filterData([...filteredData].reverse());
  };

  useEffect(() => {
    setFilteredData(props.data);
  }, [props.data]);

  return (
    <PageHeaderWrapper>
      <h2>{props.title}</h2>
      <Filters>
        <p>Search</p>
        <Input
          type="text"
          spellCheck="false"
          onChange={onSearchChange}
          value={searchValue}
        />
        <p>Sort by</p>
        <Select onChange={onSortChange} value={sortValue}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </Select>
      </Filters>
    </PageHeaderWrapper>
  );
};

export default PageHeader;
