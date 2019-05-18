import {  CheckVerificationTokenRequest, CheckVerificationTokenResponse, GeneralRequest, SendEmailRequest, SendEmailResponse, GeneralResponse, ResetUserPasswordRequest, ResetUserPasswordResponse } from "../proto/gigxRR_pb";
import { GigxRRService } from '../proto/gigxRR_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { ApiUrl } from '../global/urls_global'
import { GeneralResponseModal } from '../modals/general_response_modal'
var modal = new GeneralResponseModal()


export function DoSendEmailRequest(generalRequest_: GeneralRequest, callback: any) {
  const req = new SendEmailRequest();
  var response = new GeneralResponse();
  req.setGeneralrequest(generalRequest_);
  grpc.invoke(GigxRRService.SendEmail, {
    request: req,
    host: ApiUrl,
    metadata: new grpc.Metadata({ "language": "en" }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData_: SendEmailResponse) => {
      response = responseData_.getGeneralResponse() === null ? JSON.parse("null") : responseData_.getGeneralResponse();
    },
    onEnd: (code_: grpc.Code, msg_: string | undefined, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}
export function DoCheckVerificationTokenRequest(generalRequest_: GeneralRequest, callback: any) {
  const req = new CheckVerificationTokenRequest();
  var response = new GeneralResponse();
  req.setGeneralrequest(generalRequest_);
  grpc.invoke(GigxRRService.CheckVerificationToken, {
    request: req,
    host: ApiUrl,
    metadata: new grpc.Metadata({ "language": "en" }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData: CheckVerificationTokenResponse) => {
      response = responseData.getGeneralResponse() === null ? JSON.parse("null") : responseData.getGeneralResponse();
    },
    onEnd: (code_: grpc.Code, msg_: string | undefined, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}
export function DoResetUserPasswordRequest(generalRequest_: GeneralRequest, callback: any) {
  const req = new ResetUserPasswordRequest();
  var response = new GeneralResponse();
  req.setGeneralrequest(generalRequest_);
  grpc.invoke(GigxRRService.ResetUserPassword, {
    request: req,
    host: ApiUrl,
    metadata: new grpc.Metadata({ "language": "en" }),
    onHeaders: (headers: grpc.Metadata) => {
      // console.log("onHeaders", headers);
    },
    onMessage: (responseData: ResetUserPasswordResponse) => {
      response = responseData.getGeneralResponse() === null ? JSON.parse("null") : responseData.getGeneralResponse();
    },
    onEnd: (code_: grpc.Code, msg_: string | undefined, trailers: grpc.Metadata) => {
      modal.GrpcResponseCode = code_;
      modal.GrpcResponseMessage = msg_;
      callback(response, modal);
    }
  });
}

