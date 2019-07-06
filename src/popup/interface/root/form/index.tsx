import * as React from "react";
import { VolumeRepository } from "../../../domain/repository/VolumeRepository";
import { Volume } from "../../../domain/entity/Volume";

interface FormProps {
  readonly repository: VolumeRepository;
  readonly onVolumesFetched: (results: Volume[]) => void;
}

interface FormState {
  query: string;
}

export class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);

    this.state = { query: "" };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
  }

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value
    });
  };

  handleOnSearch = () => {
    this.props.repository
      .fetchByName(this.state.query)
      .then(volumes => this.props.onVolumesFetched(volumes));
  };

  public render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleOnChange}
        />
        <button onClick={this.handleOnSearch}>search</button>
      </div>
    );
  }
}
