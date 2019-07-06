import * as React from "react";
import { Form } from "./form";
import { Volume } from "../../domain/entity/Volume";
import { VolumeRepository } from "../../domain/repository/VolumeRepository";
import { VolumeList } from "./volumeList";
import { ClipboardRepository } from "../../domain/repository/ClipboardRepository";

interface RootProps {
  volumeRepository: VolumeRepository;
  clipboardRepository: ClipboardRepository;
}

interface RootState {
  volumes: Volume[];
}

export class Root extends React.Component<RootProps, RootState> {
  constructor(props: RootProps) {
    super(props);
    this.state = {
      volumes: []
    };
    this.handleVolumesChange = this.handleVolumesChange.bind(this);
  }

  handleVolumesChange = (results: Volume[]): void => {
    this.setState({
      volumes: results
    });
  };

  public render() {
    const volumes = this.state.volumes;

    return (
      <div>
        <Form
          repository={this.props.volumeRepository}
          onVolumesFetched={this.handleVolumesChange}
        />
        <VolumeList
          repository={this.props.clipboardRepository}
          volumes={volumes}
        />
      </div>
    );
  }
}
