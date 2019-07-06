import * as React from "react";
import { Volume } from "../../../domain/entity/Volume";
import { ClipboardRepository } from "../../../domain/repository/ClipboardRepository";

interface VolumeListProps {
  volumes: Volume[];
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
  }

  handleOnClick = (index: number) => {
    const target = this.props.volumes[index];
    if (typeof target == "undefined") {
      return;
    }

    this.props.repository.store(target.composeBibliographText());
  };

  public render() {
    const volumes = this.props.volumes;
    const list = volumes.map((volume, index) => (
      <li key={index.toString()}>
        <a href="#" onClick={e => this.handleOnClick(index)}>
          {volume.props.title}
        </a>
      </li>
    ));

    return (
      <div>
        <ul>{list}</ul>
      </div>
    );
  }
}
