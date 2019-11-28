import { Thunk } from "@siteimprove/alfa-thunk";
import { Option } from "./option";
import { Some } from "./some";

export interface None extends Option<never> {}

export const None: None = new (class None {
  public isSome(): this is Some<never> {
    return false;
  }

  public isNone(): this is None {
    return true;
  }

  public map(): None {
    return this;
  }

  public flatMap(): None {
    return this;
  }

  public apply(): None {
    return this;
  }

  public reduce<U>(reducer: unknown, accumulator: U): U {
    return accumulator;
  }

  public includes(): boolean {
    return false;
  }

  public some(): boolean {
    return false;
  }

  public every(): boolean {
    return true;
  }

  public filter(): None {
    return this;
  }

  public and(): None {
    return this;
  }

  public andThen(): None {
    return this;
  }

  public or<U>(option: Option<U>): Option<U> {
    return option;
  }

  public orElse<U>(option: Thunk<Option<U>>): Option<U> {
    return option();
  }

  public get(): never {
    throw new Error("Attempted to .get() from None");
  }

  public getOr<U>(value: U): U {
    return value;
  }

  public getOrElse<U>(value: Thunk<U>): U {
    return value();
  }

  public equals(value: unknown): value is None {
    return value === this;
  }

  public hash(): void {}

  public *[Symbol.iterator]() {}

  public toJSON(): {} {
    return {};
  }

  public toString() {
    return "None";
  }
})();
