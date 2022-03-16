import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function saveUser(next: Function) {
  const SALT_WORK_FACTOR = 10;
  // @ts-ignore
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
}

export function getUserFullName() {
  // @ts-ignore
  return `${this.firstName} ${this.lastName}`;
}

export function validatePassword(password: string) {
  // @ts-ignore
  return bcrypt.compare(password, this.password);
}

export function generateJWTToken() {
  const today = new Date();
  const expiry = new Date(today);

  expiry.setDate(today.getDate() + 2);
  return jwt.sign(
    {
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      id: this._id,
      // @ts-ignore
      exp: Number.parseInt(expiry.getTime() / 100, 10)
    },
    global.secretKey
  );
}

export function toAuthJSON() {
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  return { _id: this._id, name: this.name, token: this.generateJWTToken() };
}
