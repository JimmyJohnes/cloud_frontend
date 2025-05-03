export class QEMUImage {
  private __name: string;
  private __size: string;
  private __isFixed: boolean;
  private __format: string;
  private __location: string | undefined;
  private __createdOn: Date;

  constructor(name: string, size: number, isFixed: boolean, format: string, location?: string) {
    this.__name = name;
    this.__size = size + "G";
    this.__isFixed = isFixed;
    this.__format = format;
    this.__location = location;
    if(!location?.includes(".img")) this.__location = location + ".img";
    this.__createdOn = new Date();
  }

  // Getter methods
  public get name(): string {
    return this.__name;
  }

  public get size(): string {
    return this.__size;
  }

  public get format(): string {
    return this.__format;
  }

  public get location(): string | undefined {
    return this.__location;
  }
  public get isFixed(): boolean {
    return this.__isFixed;
  }

  public get creationDate(): Date {
    return this.__createdOn;
  }

  public get properties(): object {
    return {
      name: this.__name,
      size: this.__size,
      isFixed: this.__isFixed,
      format: this.__format,
      location: this.__location,
    }
  }

  // Setter methods
  public set name(name: string) {
    this.__name = name;
  }

  public set size(size: number) {
    this.__size = size + "G";
  }

  public set format(format: string) {
    this.__format = format;
  }

  public set location(location: string) {
    this.__location = location;
    if(!location?.includes(".img")) this.__location = location + ".img";
  }
  public set isFixed(isFixed: boolean) {
    this.__isFixed = isFixed;
  }
}