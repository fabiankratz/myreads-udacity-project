import React from "react";
import PropTypes from "prop-types";
import FilteredBookList from "./FilteredBookList/FilteredBookList";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// Wrapper for Tab Panels, required by Material-UI
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`FilteredBookList-tabpanel-${index}`}
      aria-labelledby={`FilteredBookList-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function FilteredBookListCollection(props) {
  const { namedFilters, filter, books, onUpdateBook } = props;
  const a11yProps = (index) => ({
    id: `FilteredBookList-tab-${index}`,
    "aria-controls": `FilteredBookList-tabpanel-${index}`,
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="filtered-book-list-collection">
      <AppBar position="sticky">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {namedFilters.map((namedFilter, index) => (
            <Tab
              key={namedFilter.title.text}
              label={namedFilter.title.text}
              icon={namedFilter.title.icon}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {namedFilters.map((namedFilter, index) => (
        <TabPanel key={namedFilter.title.text} value={value} index={index}>
          <FilteredBookList
            key={namedFilter.title.text}
            books={books}
            namedFilter={namedFilter}
            onUpdateBook={onUpdateBook}
            filter={ filter }
          />
        </TabPanel>
      ))}
    </div>
  );
}

FilteredBookListCollection.propTypes = {
  books: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  namedFilters: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};
