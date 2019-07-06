import { ClipboardRepository } from "../domain/repository/ClipboardRepository";

export const ClipboardRepositoryImpl: ClipboardRepository = {
  store: (value: string) => {
    chrome.runtime.sendMessage({
      text: value
    });
  }
};
