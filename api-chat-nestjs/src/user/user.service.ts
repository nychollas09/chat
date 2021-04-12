import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpExceptionResponse } from 'src/shared/domain/interface/http-exception-response.interface';
import { User, UserDocument } from 'src/shared/domain/schema/user.schema';
import UserDTO from 'src/shared/domain/dto/user.dto';
import BcryptUtil from 'src/shared/util/bcrypt.util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async getByEmail(email: string): Promise<UserDTO> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException(
        {
          message: 'Usuário não encontrado para o e-mail informado.',
          error: 'Not found',
        } as HttpExceptionResponse,
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserDTO(user.toObject());
  }

  public async save(user: UserDTO): Promise<UserDTO> {
    const userExisting = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (userExisting) {
      throw new HttpException(
        {
          message: 'Usuário já existente para o e-mail informado.',
          error: 'Conflict',
        } as HttpExceptionResponse,
        HttpStatus.CONFLICT,
      );
    }
    user.password = BcryptUtil.hashPassword(user.password);
    const newUser = await this.userModel.create(user);
    newUser.password = undefined;
    return new UserDTO(newUser.toObject());
  }
}
