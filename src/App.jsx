import React from "react";

import "./App.scss";
import { Filters, Topbar, Contacts } from "./components";
import api from "./utils/services/api";

class App extends React.Component {
  state = {
    contacts: [],
    contactsFiltered: [],
    sortSelected: "",
    search: "",
  };

  async componentDidMount() {
    try {
      const response = await api.get("contacts");
      const data = await response.data;
      this.setState({
        contacts: data,
        contactsFiltered: data,
      });
    } catch (error) {}
  }

  handleSearch = (event) => {
    const { contacts } = this.state;
    const {
      target: { value },
    } = event;
    this.setState({ search: value });
    console.log("value", value);
    console.log("contacts", contacts);
    const dataFilter = contacts.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    console.log(dataFilter);
    this.setState({ contactsFiltered: dataFilter });
  };

  handleSort = (event) => {
    const { contactsFiltered } = this.state;
    const {
      target: { name },
    } = event;
    this.setState({ sortSelected: name });

    const compareFilter = (a, b) => {
      const x = typeof a[name] === "string" ? a[name].toLowerCase() : a[name];
      const y = typeof b[name] === "string" ? b[name].toLowerCase() : b[name];

      return x < y ? -1 : x > y ? 1 : 0;
    };

    const dataFiltered = contactsFiltered.sort(compareFilter);

    this.setState({
      contactsFiltered: dataFiltered,
    });
  };

  render() {
    const { search, sortSelected, contactsFiltered } = this.state;

    return (
      <div className="app" data-testid="app">
        <Topbar />
        <Filters
          search={search}
          handleSearch={this.handleSearch.bind(this)}
          handleSort={this.handleSort.bind(this)}
          buttonSortSelected={sortSelected}
        />
        <Contacts contacts={contactsFiltered} />
      </div>
    );
  }
}
export default App;
