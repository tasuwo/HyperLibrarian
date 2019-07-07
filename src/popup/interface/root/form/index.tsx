import * as React from "react";
import * as ReactDOM from "react-dom";
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
  private searchTextField: React.RefObject<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);

    this.state = { query: "" };

    this.searchTextField = React.createRef();

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
  }

  componentDidMount() {
    if (this.searchTextField.current === null) {
      return;
    }
    this.searchTextField.current.focus();
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
          ref={this.searchTextField}
        />
        <button onClick={this.handleOnSearch}>search</button>
      </div>
    );
  }
}
