import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../object-values/address";

export default class Customer extends Entity {

  private _name: string = "";
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors());
    }
  }

  get name() {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  get Address(): Address {
    return this._address;
  }

  changeName(name: string) {
    this._name = name;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  validate() {
    if(this._id.length === 0) {
      this.notification.addError({
        context: 'Customer',
        message: 'ID cannot be empty'
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: 'Customer',
        message: 'Name cannot be empty'
      });
    }
  }

  activate() {

    if (this._address === undefined || this._address === null) throw new Error("Address cannot be empty");
    
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}