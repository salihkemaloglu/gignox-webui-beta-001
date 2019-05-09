import { LoginUserRequest, LoginUserResponse, UserLogin, User, RegisterUserRequest, RegisterUserResponse, CheckVerificationCodeRequest, CheckVerificationCodeResponse, Email, SendEmailRequest, SendEmailResponse } from "../proto/gigxRR_pb";
import { GigxRRService } from '../proto/gigxRR_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { devURL } from '../global/urls_global'
import { GeneralResponseModal } from '../modals/general_response_modal'
var modal = new GeneralResponseModal()
export function DoLoginUserRequest(userLogin_: UserLogin, callback: any) {
  const req = new LoginUserRequest();
  req.setUser(userLogin_);
  grpc.invoke(GigxRRService.Login, {
    request: req,
    host: devURL,
    metadata: new grpc.Metadata({ "language": "en" }),
    onHeaders: (headers: grpc.Metadata) => {
      console.log("onHeaders", headers);
    },
    onMessage: (responseData_: LoginUserResponse) => {
      userLogin_ = responseData_.getUser() === null ? JSON.parse("null") : responseData_.getUser();
    },
    onEnd: (code_: grpc.Code, msg_: string | undefined, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(userLogin_, modal);
    }
  });
}

export function DoRegisterUserRequest(user_: User, callback: any) {
  const req = new RegisterUserRequest();
  req.setUser(user_);
  grpc.invoke(GigxRRService.Register, {
    request: req,
    host: devURL,
    metadata: new grpc.Metadata({ "language": "en" }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData_: RegisterUserResponse) => {
      user_ = responseData_.getGeneralResponse() === null ? JSON.parse("null") : responseData_.getGeneralResponse();
      // sessionStorage.setItem("routingPage", "nav_menu");
    },
    onEnd: (code_: grpc.Code, msg_: string | undefined, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(user_, modal);
    }
  });

}
export function DoSendEmailRequest(email_: Email) {
  const req = new SendEmailRequest();
  req.setEmail(email_);
  grpc.invoke(GigxRRService.SendEmail, {
    request: req,
    host: devURL,
    metadata: new grpc.Metadata({ "language": "en" }),
    onHeaders: (headers: grpc.Metadata) => {
      console.log("onHeaders", headers);
    },
    onMessage: (responseData_: SendEmailResponse) => {
      email_ = responseData_.getGeneralResponse() === null ? JSON.parse("null") : responseData_.getGeneralResponse();
      sessionStorage.setItem("routingPage", "nav_menu");
      location.reload();
    },
    onEnd: (code_: grpc.Code, msg_: string | undefined, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      return modal;
    }
  });
}
export function DoCheckVerificationCodeRequest(email: Email) {
  const req = new CheckVerificationCodeRequest();
  req.setEmail(email);
  grpc.invoke(GigxRRService.CheckVerificationCode, {
    request: req,
    host: devURL,
    metadata: new grpc.Metadata({ "language": "en" }),
    onHeaders: (headers: grpc.Metadata) => {
      console.log("onHeaders", headers);
    },
    onMessage: (responseData: CheckVerificationCodeResponse) => {
      email = responseData.getGeneralResponse() === null ? JSON.parse("null") : responseData.getGeneralResponse();
      sessionStorage.setItem("routingPage", "nav_menu");
      location.reload();
    },
    onEnd: (code_: grpc.Code, msg_: string | undefined, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      return modal;
    }
  });
}

