/**
 * @see https://developers.google.com/books/docs/v1/reference/volumes
 */
export interface VolumeProps {
  title: string | null;
  subtitle: string | null;
  authors: string[];
  description: string | null;
  publisher: string | null;
  publishedDate: Date | null;
  pageCount: number | null;
}

export class Volume {
  props: Readonly<VolumeProps>;

  constructor(props: VolumeProps) {
    this.props = Object.freeze(props);
  }

  public composeBibliographText(): string {
    let authors =
      this.props.authors.length === 0 ? "" : this.props.authors.join(", ");
    let publishedDate = this.props.publishedDate
      ? ""
      : " (" + this.props.publishedDate + ")";
    let subtitle = this.props.subtitle ? "" : " " + this.props.subtitle;
    let title = this.props.title + subtitle;
    let publisher = this.props.publisher ? "" : this.props.publisher + ", ";
    let pageCount = this.props.pageCount ? "" : this.props.pageCount + "p";

    return (
      authors +
      publishedDate +
      ". " +
      title +
      ". " +
      publisher +
      pageCount +
      "."
    );
  }
}
