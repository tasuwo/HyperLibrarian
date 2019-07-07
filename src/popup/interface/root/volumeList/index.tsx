import * as React from "react";
import { Volume } from "../../../domain/entity/Volume";
import { ClipboardRepository } from "../../../domain/repository/ClipboardRepository";
import { ReadonlyPagedList } from "../../../domain/valueObject/PagedList";

interface VolumeListProps {
  loadMore: (from: number) => void;
  volumes: ReadonlyPagedList<Volume> | null;
  repository: ClipboardRepository;
}

interface VolumeListState {}

export class VolumeList extends React.Component<
  VolumeListProps,
  VolumeListState
> {
  constructor(props: VolumeListProps) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnLoadMore = this.handleOnLoadMore.bind(this);
  }

  handleOnClick = (volume: Volume) => {
    this.props.repository.store(volume.composeBibliographText());
  };

  handleOnLoadMore = () => {
    if (this.props.volumes === null) {
      return;
    }

    this.props.loadMore(this.props.volumes.asArray().length + 1);
  };

  public render() {
    const volumes = this.props.volumes;

    if (volumes === null) {
      return <div />;
    }

    const list = volumes.asArray().map((volume, index) => (
      <li key={index.toString()}>
        <a href="#" onClick={e => this.handleOnClick(volume)}>
          {volume.props.title}
        </a>
      </li>
    ));

    return (
      <div>
        <ul>{list}</ul>
        <button onClick={this.handleOnLoadMore}>more</button>
      </div>
    );
  }
}
