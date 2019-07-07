import * as React from "react";
import { Form } from "./form";
import { Volume } from "../../domain/entity/Volume";
import { VolumeRepository } from "../../domain/repository/VolumeRepository";
import { VolumeList } from "./volumeList";
import { ClipboardRepository } from "../../domain/repository/ClipboardRepository";
import { Observer } from "../../domain/valueObject/Observer";
import {
  PagedList,
  ReadonlyPagedList
} from "../../domain/valueObject/PagedList";

interface RootProps {
  volumeRepository: VolumeRepository;
  clipboardRepository: ClipboardRepository;
}

interface RootState {
  volumes: PagedList<Volume> | null;
}

export class Root extends React.Component<RootProps, RootState>
  implements Observer<PagedList<Volume>> {
  constructor(props: RootProps) {
    super(props);

    this.state = {
      volumes: null
    };

    this.handleVolumesChange = this.handleVolumesChange.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.onChanged = this.onChanged.bind(this);
  }

  handleVolumesChange = (volumes: PagedList<Volume>): void => {
    volumes.addObserver(this);
    volumes.loadAround(0);
  };

  handleLoadMore = (from: number): void => {
    this.state.volumes!.loadAround(from);
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
          loadMore={this.handleLoadMore}
          volumes={volumes}
          repository={this.props.clipboardRepository}
        />
      </div>
    );
  }

  onChanged(volumes: PagedList<Volume>) {
    this.setState({
      volumes
    });
  }
}
