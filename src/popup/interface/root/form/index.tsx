import * as React from "react";
import { VolumeRepository } from "../../../domain/repository/VolumeRepository";
import { Volume } from "../../../domain/entity/Volume";
import { PagedList } from "../../../domain/valueObject/PagedList";

interface FormProps {
  readonly repository: VolumeRepository;
  readonly onVolumesFetched: (results: PagedList<Volume>) => void;
}

interface FormState {
  query: string;
}

export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);

    this.state = { query: "" };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
  }

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value
    });
  };

  handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.handleOnSearch();
    }
  };

  handleOnSearch = () => {
    this.props.onVolumesFetched(
      this.props.repository.fetchByName(this.state.query)
    );
  };

  public render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
        />
        <button onClick={this.handleOnSearch}>search</button>
      </div>
    );
  }
}
