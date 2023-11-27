import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';

import jwt from 'jsonwebtoken';
import { SECRET_KEY, auth } from 'middleware/auth';
import { UseBefore } from 'routing-controllers';

import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/auth/user.service';
import { Login } from 'src/shared/interfaces/login.interface';
import { RegisterData } from 'src/shared/interfaces/register.interface';
import { validateRequest } from '../utils/validations/validators';
import { authValidationSchema } from './auth.joi.schema';
import { registerValidationSchema } from './register.joi.schema';


@UseBefore(auth)
@Controller('auth')
export class AuthController {
    private authService: AuthService;
    private userService: UserService;
    
    constructor() {
      this.authService = new AuthService();
      this.userService = new UserService();
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    public async register(@Body() userRequest, @Res() response) {
      console.log('userRequest',userRequest)
      const result = validateRequest<RegisterData>(userRequest, 'body', registerValidationSchema);
      if (result.error) {
        return response.status(400).json({ message: result.error });
      }    
      
      try {
        const user = await this.authService.register(userRequest);

        if (!user) {
          return response.status(401).json({ message: 'Invalid register data' });
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY);

        return response.json({
          ...this.userService.userToDto(user),
          token,
        });

      } catch (error) {
        return response.status(error.status ?? 400).json({ message: error.message });
      }
    }

    @Post('login')
    public async login(@Body() userRequest, @Res() response) {
      console.log('userRequest',userRequest)
      const result = validateRequest<Login>(userRequest, 'body', authValidationSchema);
      if (result.error) {
        return response.status(400).json({ message: result.error });
      }    
      
      const user = await this.authService.login(userRequest);

      if (!user) {
        return response.status(401).json({ message: 'Invalid login data' });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY);

      return response.json({
        ...this.userService.userToDto(user),
        token,
      });
    }


    @Post('/reset-password')
    public async resetPassword(userRequest, @Res() response) {
      const result = validateRequest<Login>(userRequest, 'body', authValidationSchema);
      if (result.error) {
        return response.status(400).json({ message: result.error });
      }
  
      const { email, password } = result.data;
      const userWithUpdatedPassword = await this.authService.resetUserPassword(email, password);
  
      const token = jwt.sign({ id: userWithUpdatedPassword.id }, SECRET_KEY);
  
      return response.json({
        ...this.userService.userToDto(userWithUpdatedPassword),
        token,
      });
    }
}
