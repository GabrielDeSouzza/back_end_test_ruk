export abstract class TelephoneProps {
  number: number;
  areaCode: number;
  userId?: string;
}

export class TelephoneEntity {
  private readonly props: TelephoneProps;

  constructor(props: TelephoneProps) {
    this.props = {
      ...props,
    };
  }
  public get number(): number {
    return this.props.number;
  }

  public set number(value: number) {
    this.props.number = value;
  }
  public get areaCode(): number {
    return this.props.areaCode;
  }

  public set areaCode(value: number) {
    this.props.number = value;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(value: string) {
    this.props.userId = value;
  }
}
