/**
 * @see https://developers.google.com/books/docs/v1/reference/volumes
 */
export interface VolumeProps {
  title: string | null;
  subtitle: string | null;
  authors: string[];
  description: string | null;
  publisher: string | null;
  publishedDate: string | null;
  pageCount: number | null;
}

export class Volume {
  props: Readonly<VolumeProps>;

  constructor(props: VolumeProps) {
    this.props = Object.freeze(props);
  }

  public composeBibliographText(): string {
    const p = this.props;

    const authors =
      p.authors.length > 0 ? `${p.authors.join(", ").trim()}.` : "";
    const date = p.publishedDate ? ` (${p.publishedDate.trim()}).` : "";
    const subtitle = p.subtitle ? ` ${p.subtitle.trim()}` : "";
    const title = p.title ? ` ${p.title.trim()}${subtitle}.` : "";
    const publisher = p.publisher ? ` ${p.publisher.trim()},` : "";
    const pageCount = p.pageCount ? ` ${p.pageCount}p.` : "";

    return authors + date + title + publisher + pageCount;
  }
}
