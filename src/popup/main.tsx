import * as React from "react";
import * as ReactDOM from "react-dom";
import { Root } from "./interface/root";
import { VolumeRepositoryImpl } from "./infrastructure/VolumeRepositoryImpl";
import { ClipboardRepositoryImpl } from "./infrastructure/ClipboardRepositoryImpl";

ReactDOM.render(
  <Root
    volumeRepository={VolumeRepositoryImpl}
    clipboardRepository={ClipboardRepositoryImpl}
  />,
  document.getElementById("root")
);
